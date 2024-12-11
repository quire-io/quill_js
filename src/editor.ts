import hljs from 'highlight.js';
import Quill, { type QuillOptions } from 'quill';
import BlockBlot from 'quill/blots/block';
import * as c from './custom-blots';
import QuireTheme from './custom-blots/quite-theme';
import { bindings, KeyboardExt } from './keyboard-bindings';
import { ClipboardExt } from './clipboard-matchers';

import 'highlight.js/styles/atom-one-dark.css';
import '../quill-quire.css';

BlockBlot.tagName = 'div';
Quill.register(BlockBlot);

Quill.register({
    'attributors/style/color': c.ColorClass,
    'attributors/style/size': c.SizeClass,

    'formats/autolink': c.AutolinkBlot,
    'formats/embed': c.EmbedLinkBlot,
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
    'formats/p-block': c.PBlot,
    'formats/color': c.ColorClass,
    'formats/size': c.SizeClass,

    'themes/quire': QuireTheme,

    'modules/clipboard': ClipboardExt,
    'modules/keyboard': KeyboardExt,
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
    'code-token',
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
    'embed',
    'email',
    'formula',
    'divider',
    'style',
    'mention',
    'phone',
    'refer',
    'nested-blockquote',
    'p-block',
    'color',
    'size',
    'loading-image', // Uploading image placeholder
];

export function createQuill(
    container: HTMLElement | string,
    options?: QuillOptions,
    formats?: string[]
): Quill {
    return new Quill(container, {
        ...options,
        modules: {
            toolbar: false,
            uploader: false,
            table: true,
            syntax: { hljs },
            keyboard: { bindings },
        },
        formats: formats ?? QUIRE_FORMATS,
    });
}