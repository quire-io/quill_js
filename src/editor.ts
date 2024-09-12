import hljs from 'highlight.js';
import Quill, { QuillOptions } from 'quill';
import * as c from './custom-blots';
import QuireTheme from './custom-blots/quite-theme';

import 'highlight.js/styles/atom-one-dark.css';
import '../quill-quire.css';

Quill.register({
    'attributors/style/color': c.ColorClass,
    'attributors/style/size': c.SizeClass,

    'formats/autolink': c.AutolinkBlot,
    'formats/formula': c.FormulaBlot,
    'formats/divider': c.DividerBlot,
    'formats/email': c.EmailBlot,
    'formats/style': c.StyleBlot,
    'formats/link': c.LinkBlot,
    'formats/loading-image': c.LoadingImage,
    'formats/mention': c.MentionBlot,
    'formats/phone': c.PhoneBlot,
    'formats/refer': c.ReferBlot,
    'formats/nested-blockquote': c.NestedBlockquoteBlot,
    'formats/color': c.ColorClass,
    'formats/size': c.SizeClass,

    'themes/quire': QuireTheme,
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
    'nested-blockquote',
    'color',
    'size',
    'loading-image', // Uploading image placeholder
];

export function createQuill(
    container: HTMLElement | string,
    options?: QuillOptions,
): Quill {
    return new Quill(container, {
        ...options,
        modules: {
            toolbar: false,
            uploader: false,
            table: true,
            syntax: { hljs },
        },
        formats: QUIRE_FORMATS,
    });
}