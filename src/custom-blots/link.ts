import { ScrollBlot } from 'parchment';
import LinkBlot from 'quill/formats/link';
import { QuireQuillService, getQuireService } from '../service/quire';

export default class Link extends LinkBlot {

    service: QuireQuillService;

    constructor(scroll: ScrollBlot, node: Node) {
        super(scroll, node);

        this.service = getQuireService(scroll.domNode);
        const element = node as Element;
        this.updateNode(element, Link.value(element));
    }
    
    static create(value) {
        const url = typeof value === 'string' ? value: value.url,
            title = value.title;

        const node = super.create(url);
        node.className = 'ql-link'; // Add class so we can distinguish this blot later

        Link._saveValue(node, url, title);
        
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }

    static _saveValue(node: Element, url: string, title: string | null) {
        node.setAttribute('data-value', url);

        if (title)
            node.setAttribute('title', title);
        else
            node.removeAttribute('title');
    }

    static formats(node) {
        const url = node.dataset['value'] ?? node.getAttribute('href'),
            title = node.getAttribute('title');
        return title ? {url: url, title: title}: url;
    }

    updateNode(node: Element, value: string | null): void {
        if (!value) return;

        const url = this.service.toQuireUrl(value);
        node.setAttribute('href', url);

        if (this.service.isQuireUrl(url)) {
            ///Anchor tag example
            ///<a href="http://aa.aa" rel="noopener noreferrer" target="_blank" class="ql-link">link without title</a>
            node.removeAttribute('rel');
            node.removeAttribute('target');
        } else {
            node.setAttribute('rel', 'noopener noreferrer');
            node.setAttribute('target', '_blank');
        }
    }

    format(name, value) {
        if (name === this.statics.blotName && value) {
            const url = typeof value === 'string' ? value: value.url,
                title = value.title,
                node = this.domNode;
            Link._saveValue(node, url, title);
            this.updateNode(node, url);
        } else {
            super.format(name, value);
        }
    }
}