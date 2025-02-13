import Quill from 'quill/core';
import { Blot, ParentBlot, TextBlot } from 'parchment';
import { escapeText } from 'quill/blots/text';
import { Delta, type Range } from 'quill/core';
import logger from 'quill/core/logger';
import Clipboard from 'quill/modules/clipboard';
import { service } from './service/quire';
import { overload, convertHTML } from "./service/editor";

const debug = logger('quill:clipboard');


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
        [index, length] = overload(index, length);
        const [line, lineOffset] = this.quill.scroll.line(index);
        if (line) {
            const lineLength = line.length();
            const isWithinLine = line.length() >= lineOffset + length;
            if (isWithinLine && !(lineOffset === 0 && length === lineLength)) {
                return convertHTML(line, lineOffset, length, true);
            }
            return convertHTML(this.quill.scroll, index, length, true);
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

        delta = this.removeTrailingNewline(delta.concat(pastedDelta));
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

        const result = service.convertText(text ?? '', formats);
        if (result != null) {
            return [new Delta(JSON.parse(result)), true];
        }

        return [
            new Delta().insert(text || '', formats),
            true,
        ];
    }

    private removeTrailingNewline(delta: Delta): Delta {
        const len = delta.ops.length;
        if (len === 0)
            return delta;

        const lastOp = delta.ops[len - 1];
        if (lastOp
                && typeof lastOp.insert === 'string'
                && lastOp.insert.endsWith('\n')
                && lastOp.attributes == null) {
            // If the last character is a newline, remove it
            const newLength = lastOp.insert.length - 1;
            if (newLength === 0) {
                delta.ops.pop();
            } else {
                lastOp.insert = lastOp.insert.slice(0, -1);
            }
        }
        return delta;
    }
}