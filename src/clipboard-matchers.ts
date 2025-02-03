import Quill from 'quill/core';
import { Blot, ParentBlot, TextBlot } from 'parchment';
import { escapeText } from 'quill/blots/text';
import ListItem from 'quill/formats/list';
import { Delta, type Range } from 'quill/core';
import logger from 'quill/core/logger';
import Clipboard from 'quill/modules/clipboard';
import { service } from './service/quire';

const debug = logger('quill:clipboard');

interface _ListItem {
    child: Blot;
    offset: number;
    length: number;
    indent: number;
    type: string;
}

export class ClipboardExt extends Clipboard {
    constructor(quill: Quill, options: any) {
        super(quill, options);
    }

    onCopy(range: Range, isCut: boolean);
    onCopy(range: Range) {
        ///Move implements form
        /// https://github.com/slab/quill/blob/ebe16ca24724ac4f52505628ac2c4934f0a98b85/packages/quill/src/modules/clipboard.ts#L229
        const text = this.quill.getText(range);
        const html = this._getHTML(range);

        // console.log(html);

        return { html, text };
    }

    _getHTML(index: Range | number = 0, length?: number) {
        if (typeof index === 'number') {
          length = length ?? this.quill.getLength() - index;
        }
        [index, length] = this._overload(index, length);
        const [line, lineOffset] = this.quill.scroll.line(index);
        if (line) {
            const lineLength = line.length();
            const isWithinLine = line.length() >= lineOffset + length;
            if (isWithinLine && !(lineOffset === 0 && length === lineLength)) {
                if (line instanceof ListItem && 'html' in line 
                        && typeof line.html === 'function') {//#21045
                    const format = line.statics.formats(line.domNode, this.quill.scroll);
                    const [tag, attribute] = this._getListType(format);
                    return `<${tag}><li${attribute}>${line.html(lineOffset, length)}</li></${tag}>`;
                }

                return this._convertHTML(line, lineOffset, length, true);
            }
            return this._convertHTML(this.quill.scroll, index, length, true);
        }
        return '';
      }

    onPaste(range: Range, { text, html }: { text?: string; html?: string; }) {
        const formats = this.quill.getFormat(range.index);

        let pastedDelta: Delta;
        let replaceSelection = true;
        if (!html) {
            // https://github.com/slab/quill/issues/4421
            [pastedDelta, replaceSelection] = this.convertText(text, formats, range);
        } else {
            pastedDelta = this.convert({ text, html }, formats);
        }
        debug.log('onPaste', pastedDelta, { text, html });

        for (var op of pastedDelta.ops) {
            var attrs = op.attributes;
            if (attrs == null) continue;
            if (attrs['align'] != null && attrs['table'] == null) {
                attrs['align'] = null;//#20930: [Quill] Only support align in table
            }
        }

        var delta = new Delta().retain(range.index);
        if (replaceSelection)
            delta.delete(range.length)

        delta = delta.concat(pastedDelta);
        this.quill.updateContents(delta, Quill.sources.USER);
        // range.length contributes to delta.length()
        this.quill.setSelection(
            delta.length() - (replaceSelection ? range.length : 0),
            Quill.sources.SILENT,
        );
        this.quill.scrollSelectionIntoView();
    }

    convert({ html, text }: { html?: string; text?: string; }, formats: Record<string, unknown> = {}): Delta {
        let result = super.convert({ html, text }, formats);
        if (formats.table) {
            // Remove newline in delta insert operations since table cells don't support newline
            result = result.reduce((newDelta, op) => {
                const insert = op.insert;
                if (typeof insert === 'string') {
                    if (insert === '\n') {
                        // Ignore line breaks and block formats
                    } else {
                        newDelta.insert(insert.replace(/\n/g, ' '), op.attributes);
                    }
                } else {
                    newDelta.push(op);
                }

                return newDelta;
            }, new Delta());
        }
        return result;
    }

    /**
     * Convert pasted HTML into Delta.
     * @param html HTML.
     * @returns The result delta object
     */
    convertHTML(html: string): Delta {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        this.normalizeHTML(doc);
        const container = doc.body;
        const result = service.convertHTML(container.innerHTML);
        if (result != null) {
            return new Delta(JSON.parse(result));
        }
        return super.convertHTML(html);
    }

    /**
     * Convert pasted text into Delta.
     * @param text Text.
     * @param formats Applied formats.
     * @param range Selection.
     * @returns The result delta object 
     *          and a flag indicating whether the selection should be replaced
     */
    convertText(text?: string, formats: Record<string, unknown> = {}, range?: Range): [Delta, boolean] {
        const selLen = range?.length ?? 0;
        // Select text and paste URL to apply link
        if (selLen > 0 && text?.match(/^https?:\/\/\S+/)) {
            return [
                new Delta().retain(selLen, {link: text}),
                false,
            ];
        }

        if (formats.table) {
            // Remove newline in delta insert operations since table cells don't support newline
            text = text?.replace(/\n/g, ' ');
        }

        return [
            new Delta().insert(text || '', formats),
            true,
        ];
    }

    _overload(index: Range | number,
        length?: number, name?: string, value?: unknown, source?): [
            number, number, Record<string, unknown>, unknown] {
        let formats: Record<string, unknown> = {};
        // @ts-expect-error
        if (typeof index.index === 'number' && typeof index.length === 'number') {
          // Allow for throwaway end (used by insertText/insertEmbed)
          if (typeof length !== 'number') {
            source = value;
            value = name;
            name = length;
            // @ts-expect-error
            length = index.length; // eslint-disable-line prefer-destructuring
            // @ts-expect-error
            index = index.index; // eslint-disable-line prefer-destructuring
          } else {
            // @ts-expect-error
            length = index.length; // eslint-disable-line prefer-destructuring
            // @ts-expect-error
            index = index.index; // eslint-disable-line prefer-destructuring
          }
        } else if (typeof length !== 'number') {
          source = value;
          value = name;
          name = length;
          length = 0;
        }
        // Handle format being object, two format name/value strings or excluded
        if (typeof name === 'object') {
          formats = name;
          source = value;
        } else if (typeof name === 'string') {
          if (value != null) {
            formats[name] = value;
          } else {
            source = name;
          }
        }
        // Handle optional source
        source = source || 'api';
        // @ts-expect-error
        return [index, length, formats, source];
    }

    _convertHTML(blot: Blot, index: number, length: number, isRoot = false) {
      const blotName = blot.statics.blotName;
      // console.log(`b ${blotName}`);
        if ('html' in blot && typeof blot.html === 'function') {
          // console.log(`in ${blot.statics.blotName}`);
          return blot.html(index, length);
        }
        if (blot instanceof TextBlot) {
            const escapedText = escapeText(blot.value().slice(index, index + length));
            // console.log(`int ${blot.statics.blotName}`);
            return escapedText.replaceAll(' ', '&nbsp;');
          }
          if (blot instanceof ParentBlot) {
            // console.log(`inp ${blot.statics.blotName}`);
            // TODO fix API
            if (blotName === 'list-container') {
              const items: any[] = [];
              blot.children.forEachAt(index, length, (child, offset, childLength) => {
                const formats =
                  'formats' in child && typeof child.formats === 'function'
                    ? child.formats()
                    : {};
                items.push({
                  child,
                  offset,
                  length: childLength,
                  indent: formats.indent || 0,
                  type: formats.list,
                });
              });
              return this._convertListHTML(items, -1, []);
            }
            const parts: string[] = [];
            blot.children.forEachAt(index, length, (child, offset, childLength) => {
              parts.push(this._convertHTML(child, offset, childLength));
            });
            if (isRoot || blotName === 'list') {
              if (blotName === 'header') {
                const tagName = blot.domNode.tagName.toLowerCase();
                return `<${tagName}>${parts.join('')}</${tagName}>`;
              }
              return parts.join('');
            }
            const { outerHTML, innerHTML } = blot.domNode as Element;
            const [start, end] = outerHTML.split(`>${innerHTML}<`);
            // TODO cleanup
            if (start === '<table') {
              return `<table style="border: 1px solid #000;">${parts.join('')}<${end}`;
            }
            return `${start}>${parts.join('')}<${end}`;
        }
        return blot.domNode instanceof Element ? blot.domNode.outerHTML : '';
    }

    _convertListHTML(
        items: _ListItem[],
        lastIndent: number,
        types: string[],
      ): string {
        if (items.length === 0) {
          const [endTag] = this._getListType(types.pop());
          if (lastIndent <= 0) {
            return `</li></${endTag}>`;
          }
          return `</li></${endTag}>${this._convertListHTML([], lastIndent - 1, types)}`;
        }
        const [{ child, offset, length, indent, type }, ...rest] = items;
        const [tag, attribute] = this._getListType(type);
        if (indent > lastIndent) {
          types.push(type);
          if (indent === lastIndent + 1) {
            return `<${tag}><li${attribute}>${this._convertHTML(
              child,
              offset,
              length,
            )}${this._convertListHTML(rest, indent, types)}`;
          }
          return `<${tag}><li>${this._convertListHTML(items, lastIndent + 1, types)}`;
        }
        const previousType = types[types.length - 1];
        if (indent === lastIndent && type === previousType) {
          return `</li><li${attribute}>${this._convertHTML(
            child,
            offset,
            length,
          )}${this._convertListHTML(rest, indent, types)}`;
        }
        const [endTag] = this._getListType(types.pop());
        return `</li></${endTag}>${this._convertListHTML(items, lastIndent - 1, types)}`;
    }

    _getListType(type: string | undefined) {
        const tag = type === 'ordered' ? 'ol' : 'ul';
        switch (type) {
          case 'checked':
            return [tag, ' data-list="checked"'];
          case 'unchecked':
            return [tag, ' data-list="unchecked"'];
          default:
            return [tag, ''];
        }
    }
}