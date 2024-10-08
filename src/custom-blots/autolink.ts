import { EmbedBlot } from 'parchment';
import { service } from '../service/quire';

class AutolinkBlot extends EmbedBlot {
    static blotName = 'autolink';
    static className = 'ql-autolink';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as HTMLAnchorElement;
        node.setAttribute('data-value', value);
        
        let children = service.renderAutolink(value);
        node.replaceChildren(children);
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }
}

export default AutolinkBlot;