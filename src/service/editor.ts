import { Blot, ParentBlot, TextBlot } from 'parchment';
import { escapeText } from 'quill/blots/text';
import { type Range } from 'quill/core';

// https://github.com/slab/quill/blob/522fd7ee0682498516df7389bacb6f7eb6e92b77/packages/quill/src/core/editor.ts#L363
export function convertHTML(
    blot: Blot,
    index: number,
    length: number,
    isRoot = false,
): string {
    const blotName = blot.statics.blotName;
    // console.log(`b ${blotName}`);
    if ('html' in blot && typeof blot.html === 'function') {
        // console.log(`in ${blotName}`);
        return blot.html(index, length);
    }
    if (blot instanceof TextBlot) {
        const escapedText = escapeText(blot.value().slice(index, index + length));
        // console.log(`in text ${blotName}`);
        // return escapedText.replaceAll(' ', '&nbsp;');
        return escapedText;//##20887: Don't need to replace with '&nbsp;'
    }
    if (blot instanceof ParentBlot) {
        // console.log(`in p ${blotName}`);
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
            return _convertListHTML(items, -1, []);
          }
        const parts: string[] = [];
        blot.children.forEachAt(index, length, (child, offset, childLength) => {
            parts.push(convertHTML(child, offset, childLength));
        });
        
        if (blotName === 'header') {
            const tagName = blot.domNode.tagName.toLowerCase();
            return `<${tagName}>${parts.join('')}</${tagName}>`;
        }

        if (isRoot || blotName === 'list') {
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

interface _ListItem {
    child: Blot;
    offset: number;
    length: number;
    indent: number;
    type: string;
}

export function overload(index: Range | number,
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

function _convertListHTML(
    items: _ListItem[],
    lastIndent: number,
    types: string[],
  ): string {
    if (items.length === 0) {
      const [endTag] = _getListType(types.pop());
      if (lastIndent <= 0) {
        return `</li></${endTag}>`;
      }
      return `</li></${endTag}>${_convertListHTML([], lastIndent - 1, types)}`;
    }
    const [{ child, offset, length, indent, type }, ...rest] = items;
    const [tag, attribute, checkbox] = _getListType(type);
    if (indent > lastIndent) {
      types.push(type);
      if (indent === lastIndent + 1) {
        return `<${tag}><li${attribute}>${checkbox}${convertHTML(
          child,
          offset,
          length,
        )}${_convertListHTML(rest, indent, types)}`;
      }
      return `<${tag}><li>${_convertListHTML(items, lastIndent + 1, types)}`;
    }
    const previousType = types[types.length - 1];
    if (indent === lastIndent && type === previousType) {
      return `</li><li${attribute}>${checkbox}${convertHTML(
        child,
        offset,
        length,
      )}${_convertListHTML(rest, indent, types)}`;
    }
    const [endTag] = _getListType(types.pop());
    return `</li></${endTag}>${_convertListHTML(items, lastIndent - 1, types)}`;
}

function _getListType(type: string | undefined) {
    const tag = type === 'ordered' ? 'ol' : 'ul';
    switch (type) {
      case 'checked':
        return [tag, ' data-list="checked"', '<input type="checkbox" checked>'];
      case 'unchecked':
        return [tag, ' data-list="unchecked"', '<input type="checkbox">'];
      default:
        return [tag, '', ''];
    }
}