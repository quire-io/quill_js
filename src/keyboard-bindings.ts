import { Scope } from 'parchment';
import Delta from 'quill-delta';
import Quill, { type Range } from 'quill/core/quill';
import Keyboard, { type Context } from 'quill/modules/keyboard';

export class KeyboardExt extends Keyboard {
    constructor(quill: Quill, options: any) {
        super(quill, options);
    }

    handleEnter(range: Range, context: Context) {
        const lineFormats = Object.keys(context.format).reduce(
            (formats: Record<string, unknown>, format) => {
                if (
                    this.quill.scroll.query(format, Scope.BLOCK) &&
                    !Array.isArray(context.format[format])
                ) {
                    formats[format] = context.format[format];
                }
                return formats;
            },
            {},
        );
        const delta = new Delta()
            .retain(range.index)
            .delete(range.length)
            .insert('\n', lineFormats);
        this.quill.updateContents(delta, Quill.sources.USER);
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
        this.quill.focus();

        // Potix: rollback https://github.com/slab/quill/pull/3428
        Object.keys(context.format).forEach(name => {
            if (lineFormats[name] != null) return;
            if (Array.isArray(context.format[name])) return;
            if (name === 'code' || name === 'link') return;
            this.quill.format(name, context.format[name], Quill.sources.USER);
        });
    }
}

export const bindings = {
    // Potix: #20741
    'list autofill': {
        key: ' ',
        shiftKey: null,
        collapsed: true,
        format: {
            'code-block': false,
            blockquote: false,
            table: false,
            header: false,
        },
        prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
        handler(range: Range, context: Context) {
            if (this.quill.scroll.query('list') == null) return true;
            const { length } = context.prefix;
            const [line, offset] = this.quill.getLine(range.index);
            if (offset > length) return true;
            let value: string;
            switch (context.prefix.trim()) {
                case '[]':
                case '[ ]':
                    value = 'unchecked';
                    break;
                case '[x]':
                    value = 'checked';
                    break;
                case '-':
                case '*':
                    value = 'bullet';
                    break;
                default:
                    value = 'ordered';
            }
            this.quill.insertText(range.index, ' ', Quill.sources.USER);
            this.quill.history.cutoff();
            const delta = new Delta()
                .retain(range.index - offset)
                .delete(length + 1)
                .retain(line.length() - 2 - offset)
                .retain(1, { list: value });
            this.quill.updateContents(delta, Quill.sources.USER);
            this.quill.history.cutoff();
            this.quill.setSelection(range.index - length, Quill.sources.SILENT);
            return false;
        },
     },
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
    },
    // Potix: override the UX
    'table enter': {
        key: 'Enter',
        shiftKey: null,
        format: ['table'],
        handler(range: Range) {
            const module = this.quill.getModule('table');
            if (module) {
                const [table, row, cell] = module.getTable(range);
                const nextRow = row.next;
                const cellOffset = cell.cellOffset();
                let index = table.offset();
                if (nextRow != null) {
                    const nextCell = nextRow.children.at(cellOffset);
                    if (nextCell != null) {
                        this.quill.setSelection(
                            index + nextRow.offset() + nextCell.offset() + nextCell.length() - 1,
                            0,
                            Quill.sources.USER,
                        );
                    }
                } else {
                    index += table.length();
                    const delta = new Delta().retain(index).insert('\n');
                    this.quill.updateContents(delta, Quill.sources.USER);
                    this.quill.setSelection(index, Quill.sources.USER);
                }
            }
        },
    },
};