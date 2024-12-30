import { type BlockBlot, Scope } from 'parchment';
import Delta from 'quill-delta';
import Quill, { type Range } from 'quill/core/quill';
import Keyboard, { type Context } from 'quill/modules/keyboard';
import { service } from './service/quire';
import { SoftBreak } from './custom-blots';

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
    // Potix: #20690
    'checklist autofill': {
        key: ' ',
        shiftKey: null,
        collapsed: true,
        format: {
            'code-block': false,
            blockquote: false,
            table: false,
            header: false,
        },
        prefix: /^\s*?(\d+\.|-|\*) \[[xX ]?\]$/,
        handler(range: Range, context: Context) {
            if (this.quill.scroll.query('list') == null) return true;
            const { length } = context.prefix;
            const [line, offset] = this.quill.getLine(range.index);
            if (offset > length) return true;
            const value = context.prefix.trim().toLowerCase().endsWith('[x]') 
                ? 'checked' 
                : 'unchecked';
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
        prefix: /^>$/,
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
        prefix: /^-{3,}$/,
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
            const [line] = quill.getLine(pos);
            let cur = line?.prev as BlockBlot | undefined;
            if (cur?.formats && cur?.formats()[blot]) return true;

            quill.history.cutoff();
            quill.formatLine(pos, 1, blot, false, Quill.sources.USER);
            quill.history.cutoff();
            return false;
        },
    },
    'linebreak': {
        key: 'Enter',
        handler(range: Range, context: Context) {
            /**
            Case 1                  Results
                p                   p
                d  < enter here     p
                p                   p < cursor here
                                    p

            Case 2                  Results
                p                   p
                d < enter here      p
                d                   d < cursor here
                                    d
                
             */

            if (context.line.domNode.dataset['disable'] == 'Enter') {
                return false;
            }
            const pos = range.index;
            const blotName = SoftBreak.blotName;
            if (context.format[blotName]) {
                // const [line, offset] = this.quill.getLine(
                //     pos + context.suffix.length + 1);
                // const beforeSoftBreak = line instanceof SoftBreak;

                this.quill.format(blotName, false, Quill.sources.USER);
                this.quill.insertText(pos, '\n', Quill.sources.USER);
                this.quill.setSelection(pos + 1);

                // if (beforeSoftBreak)
                this.quill.format(blotName, true, Quill.sources.USER);
                    
                return false;
            }
            return true;
        }
    },
    'linebreak with shift': {
        key: 'Enter',
        shiftKey: true,  
        handler(range: Range, context: Context) {
            /**
            Case 1                      Results
                p                       p
                p < shift + enter here  d
                p                       p < cursor here
                                        p

            Case 2                      Results
                p < shift + enter here  d
                d                       p < cursor here
                p                       d
                                        p

            Case 3                      Results
                p                       p
                d  < shift + enter here d
                p                       d < cursor here
                                        p

             Case 4                     Results
                p                       p
                d  < shift + enter here d
                d                       d < cursor here
                                        d
                
             */
            const pos = range.index;
            const blotName = SoftBreak.blotName;
            if (context.format[blotName]) {//Case 3, 4

            } else if (service.canReplaceParagraph(context.format)) {
                // const [line, offset] = this.quill.getLine(
                //     pos + context.suffix.length + 1);
                // const beforeSoftBreak = line instanceof SoftBreak;

                this.quill.format(blotName, true, Quill.sources.USER);
                this.quill.insertText(pos, '\n', Quill.sources.USER);
                this.quill.setSelection(pos + 1, Quill.sources.SILENT);
                

                //if (!beforeSoftBreak)
                this.quill.format(blotName, false, Quill.sources.USER);

                return false;
            }
            return true;
        }
    },
    'merge soft break': {
        key: 'Backspace',
        handler(range: Range, context: Context) {
            /**
            Case 1                  Results
                p                   d < cursor here
                d  < Backspace here p
                p                   p
                p

            Case 2                  Results
                p                   p
                d                   p < cursor here
                p < Backspace here  p
                p

            Case 3                  Results
                p                   p
                d  < enter here     p
                d                   p < cursor here
                                    d
                
             */
            const pos = range.index;
            const blotName = SoftBreak.blotName;
            const [line, offset] = this.quill.getLine(pos - 1);
            const afterSoftBreak = line instanceof SoftBreak;

            if (context.format[blotName]) {
                if (!afterSoftBreak) {
                    this.quill.formatText(pos - 1, 1, 
                        blotName, true, Quill.sources.USER);
                }
            } else {
                if (afterSoftBreak)
                    this.quill.formatText(pos - 1, 1, 
                        blotName, false, Quill.sources.USER);
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
                if (row.next == null)
                    module.insertRowBelow();

                const nextRow = row.next;
                if (nextRow != null) {
                    const cellOffset = cell.cellOffset();
                    const nextCell = nextRow.children.at(cellOffset);
                    if (nextCell != null) {
                        this.quill.setSelection(
                            table.offset() + nextRow.offset() + nextCell.offset() + nextCell.length() - 1,
                            0,
                            Quill.sources.USER,
                        );
                    }
                }
            }
        },
    },
    'code backspace': {
        key: 'Backspace',
        format: ['code'],
        collapsed: true,
        prefix: /^$/, // Don't use empty: true since the line doesn't have to be empty
        suffix: /^$/,
        handler(range: Range, context: Context) {
            this.quill.format('code', false, Quill.sources.USER);
            return false;
        },
    },
    // Potix: override UX
    'code exit': {
        key: 'Enter',
        collapsed: true,
        format: ['code-block'],
        prefix: /^$/,
        suffix: /^\s*$/,
        handler() {
            return true;
        },
    },
};