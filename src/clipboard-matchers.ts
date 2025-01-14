import Quill from 'quill/core';
import { Delta, type Range } from 'quill/core';
import logger from 'quill/core/logger';
import Clipboard from 'quill/modules/clipboard';
import { service } from './service/quire';

const debug = logger('quill:clipboard');

export class ClipboardExt extends Clipboard {
    constructor(quill: Quill, options: any) {
        super(quill, options);
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
}