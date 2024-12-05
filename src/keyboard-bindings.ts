import Quill, { type Range } from 'quill/core/quill';
import { type Context } from 'quill/modules/keyboard';

export const bindings = {
    'nested-blockquote empty enter': {
        key: 'Enter',
        collapsed: true,
        format: ['nested-blockquote'],
        empty: true,
        handler() {
            this.quill.format('nested-blockquote', false, Quill.sources.USER);
        },
    },
    'blockquote autofill': {
        key: ' ',
        shiftKey: null,
        collapsed: true,
        format: {
            'code-block': false,
            blockquote: false,
            table: false,
        },
        empty: false,
        prefix: /^>$/,
        suffix: /^$/,
        handler(range: Range, context: Context) {
            const quill: Quill = this.quill;
            if (quill.scroll.query('blockquote') == null)
                return true;

            quill.history.cutoff();
            const { length } = context.prefix;
            const pos = range.index - length;
            quill.formatLine(pos, 1, 'blockquote', true, Quill.sources.USER);
            quill.deleteText(pos, length, Quill.sources.USER);
            quill.history.cutoff();
            return false;
        },
    },
    'divider autofill': {
        key: 'Enter',
        collapsed: true,
        format: {
            'code-block': false,
            blockquote: false,
            table: false,
        },
        empty: false,
        prefix: /^-{3,}$/,
        suffix: /^$/,
        handler(range: Range, context: Context) {
            const quill: Quill = this.quill;
            if (quill.scroll.query('divider') == null)
                return true;

            quill.history.cutoff();
            const { length } = context.prefix;
            const pos = range.index - length;
            quill.deleteText(pos, length, Quill.sources.USER);
            quill.insertEmbed(pos, 'divider', true, Quill.sources.USER);
            quill.setSelection(pos + 1, Quill.sources.USER);
            quill.history.cutoff();
            return false;
        },
    },
    'code-block autofill': {
        key: 'Enter',
        collapsed: true,
        format: {
            'code-block': false,
            blockquote: false,
            table: false,
        },
        empty: false,
        prefix: /^`{3}$/,
        suffix: /^$/,
        handler(range: Range, context: Context) {
            const quill: Quill = this.quill;
            if (quill.scroll.query('code-block') == null)
                return true;

            quill.history.cutoff();
            const { length } = context.prefix;
            const pos = range.index - length;
            quill.formatLine(pos, 1, 'code-block', true, Quill.sources.USER);
            quill.deleteText(pos, length, Quill.sources.USER);
            quill.setSelection(pos, Quill.sources.USER);
            quill.history.cutoff();
            return false;
        },
    },
    'empty backspace': {
        key: 'Backspace',
        collapsed: true,
        empty: true,
        format: ['code-block', 'blockquote', 'nested-blockquote'],
        handler(range: Range, context: Context) {
            const quill: Quill = this.quill;
            const pos = range.index;
            const blot = context.line.statics.blotName;
            quill.history.cutoff();
            quill.formatLine(pos, 1, blot, false, Quill.sources.USER);
            quill.history.cutoff();
            return false;
        },
    },
    'linebreak': {
        key: 'Enter',
        collapsed: true,
        handler(range: Range, context: Context) {
            if (!Object.keys(context.format).length) {
            // if (!context.format['p-block']) {
                this.quill.format('p-block', true, Quill.sources.USER);
                const pos = range.index;
                this.quill.insertText(pos, '\n', Quill.sources.USER);
                
                this.quill.setSelection(pos + 1);
                this.quill.format('p-block', false, Quill.sources.USER);
                return false;
            }
            return true;
        }
    },
    'linebreak with shift': {
        key: 'Enter',
        collapsed: true,
        shiftKey: true,  
        handler(range: Range, context: Context) {
            if (context.format['p-block']) {
                this.quill.format('p-block', false, Quill.sources.USER);
                this.quill.insertText(range.index, '\n', Quill.sources.USER);
                this.quill.setSelection(range.index + 1);
                return false;
            }
            return true;
        }
    }
};