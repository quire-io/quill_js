import Quill from 'quill/core';
import { Delta, type Range } from 'quill/core';
import logger from 'quill/core/logger';
import Clipboard from 'quill/modules/clipboard';

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

    /**
     * Convert pasted text into Delta.
     * @param text Text.
     * @param formats Applied formats.
     * @param range Selection.
     * @returns The result delta object 
     *          and a flag indicating whether the selection should be replaced
     */
    convertText(text?: string, formats?: Record<string, unknown>, range?: Range): [Delta, boolean] {
        const selLen = range?.length ?? 0;
        // Select text and paste URL to apply link
        if (selLen > 0 && text?.match(/^https?:\/\/\S+/)) {
            return [
                new Delta().retain(selLen, {link: text}),
                false,
            ];
        }

        return [
            new Delta().insert(text || '', formats),
            true,
        ];
    }
}