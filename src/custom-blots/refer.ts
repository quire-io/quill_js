import { EmbedBlot } from 'parchment';
import { service } from '../service/quire';

class ReferBlot extends EmbedBlot {
    static blotName = 'refer';
    static className = 'ql-refer';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as Element;
        node.setAttribute('data-value', value);
        node.setAttribute('contenteditable', 'false');

        let children = service.renderRefer(value);
        node.replaceChildren(children);
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }
}

export default ReferBlot;