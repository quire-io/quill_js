import LinkBlot from 'quill/formats/link';

import { service } from '../service/quire';

export default class Link extends LinkBlot {
    static create(value) {
        const title = value.title,
            url = typeof value === 'string' ? value: value.url,
            node = super.create(url);

        if (title)
            node.setAttribute('title', title);

        if (service.isQuireUrl(url)) {
            ///Anchor tag example
            ///<a href="http://aa.aa" rel="noopener noreferrer" target="_blank" class="ql-link">link without title</a>
            node.removeAttribute('rel');
            node.removeAttribute('target');
        }

        node.className = 'ql-link'; // Add class so we can distinguish this blot later
        return node;
    }

    static formats(node) {
        const url = node.getAttribute('href'),
            title = node.getAttribute('title');
        return title ? {url: url, title: title}: url;
    }
}