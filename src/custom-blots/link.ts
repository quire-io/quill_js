import LinkBlot from 'quill/formats/link';

import { service } from '../service/quire';

export default class Link extends LinkBlot {
    static create(value) {
        const title = value.title,
            data = typeof value === 'string' ? value: value.url,
            url = service.toQuireUrl(data),
            node = super.create(url);

        node.dataset['value'] = data;

        if (title)
            node.setAttribute('title', title);

        if (service.isQuireUrl(url)) {
            ///Anchor tag example
            ///<a href="http://aa.aa" rel="noopener noreferrer" target="_blank" class="ql-link">link without title</a>
            node.removeAttribute('rel');
            node.removeAttribute('target');
        }

        node.className = 'ql-link'; // Add class so we can distinguish this blot later
        node.contentEditable = 'false'; // Disable editing of the link
        return node;
    }

    static formats(node) {
        const url = node.dataset['value'],
            title = node.getAttribute('title');
        return title ? {url: url, title: title}: url;
    }
}