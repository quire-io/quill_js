import hljs from 'highlight.js';
import Quill, { QuillOptions } from 'quill';
import * as c from './custom-blots';

import 'highlight.js/styles/atom-one-dark.css';
import 'quill/dist/quill.snow.css';

Quill.register({
    'formats/autolink': c.AutolinkBlot,
    'formats/formula': c.FormulaBlot,
    'formats/divider': c.DividerBlot,
    'formats/email': c.EmailBlot,
    'formats/style': c.StyleBlot,
    'formats/mention': c.MentionBlot,
    'formats/phone': c.PhoneBlot,
    'formats/refer': c.ReferBlot,
}, true);

const CORE_FORMATS = ['block', 'break', 'cursor', 'inline', 'scroll', 'text'];

const QUIRE_FORMATS = [
    ...CORE_FORMATS,

    // see https://github.com/slab/quill/tree/d5efd42de7857ee25fcf16446d81a96a38ff1bca/packages/quill/src/formats
    'align',
    'blockquote',
    'bold',
    'code',
    'code-block',
    'header',
    'image',
    'indent',
    'italic',
    'link',
    'list',
    'strike',
    'table',
    'underline',

    // Quire-flavor Markdown
    'autolink',
    'email',
    'formula',
    'divider',
    'style',
    'mention',
    'phone',
    'refer',
];

const toolbarOptions = {
    container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code', 'code-block'],
        ['link', 'image'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        ['clean'],
    ],
};

export function createQuill(
    container: HTMLElement | string,
    options?: QuillOptions,
): Quill {
    return new Quill(container, {
        ...options,
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions,
            syntax: { hljs },
        },
        formats: QUIRE_FORMATS,
    });
}