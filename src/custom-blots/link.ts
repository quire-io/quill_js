import LinkBlot from 'quill/formats/link';

import { service } from '../service/quire';

export default class Link extends LinkBlot {
    static create(value) {
        const data = typeof value === 'string' ? value: value.url,
            url = service.toQuireUrl(data),
            node = super.create(url);

        Link._updateNode(node, data, url, value.title);

        node.className = 'ql-link'; // Add class so we can distinguish this blot later
        return node;
    }

    static _updateNode(node: Element, value: string, url: string, title: string) {
        node.setAttribute('href', url);
        node.setAttribute('data-value', value);

        if (title)
            node.setAttribute('title', title);
        else
            node.removeAttribute('title');

        if (service.isQuireUrl(url)) {
            ///Anchor tag example
            ///<a href="http://aa.aa" rel="noopener noreferrer" target="_blank" class="ql-link">link without title</a>
            node.removeAttribute('rel');
            node.removeAttribute('target');
        } else {
            node.setAttribute('rel', 'noopener noreferrer');
            node.setAttribute('target', '_blank');
        }
    }

    static formats(node) {
        const url = node.dataset['value'] ?? node.getAttribute('href'),
            title = node.getAttribute('title');
        return title ? {url: url, title: title}: url;
    }

    format(name, value) {
        if (name === this.statics.blotName && value) {
            const data = typeof value === 'string' ? value: value.url,
                url = service.toQuireUrl(data);
          Link._updateNode(this.domNode, data, url, value.title);
        } else {
          super.format(name, value);
        }
    }
}