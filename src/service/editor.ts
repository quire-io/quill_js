import { Blot, ParentBlot, TextBlot } from 'parchment';
import { escapeText } from 'quill/blots/text';

// https://github.com/slab/quill/blob/522fd7ee0682498516df7389bacb6f7eb6e92b77/packages/quill/src/core/editor.ts#L363
export function convertHTML(
    blot: Blot,
    index: number,
    length: number,
    isRoot = false,
): string {
    if ('html' in blot && typeof blot.html === 'function') {
        return blot.html(index, length);
    }
    if (blot instanceof TextBlot) {
        const escapedText = escapeText(blot.value().slice(index, index + length));
        return escapedText.replaceAll(' ', '&nbsp;');
    }
    if (blot instanceof ParentBlot) {
        const parts: string[] = [];
        blot.children.forEachAt(index, length, (child, offset, childLength) => {
            parts.push(convertHTML(child, offset, childLength));
        });
        if (isRoot || blot.statics.blotName === 'list') {
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