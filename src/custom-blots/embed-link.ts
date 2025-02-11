import { EmbedBlot } from 'parchment';
import { service } from '../service/quire';

class EmbedLinkBlot extends EmbedBlot {
    static blotName = 'embed';
    static className = 'ql-autolink';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as HTMLAnchorElement;
        node.setAttribute('data-value', value);
        // node.setAttribute('contenteditable', 'false');
        
        let children = service.renderAutolink(value);
        node.replaceChildren(children);
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }

    format(name, value) {
        if (name === this.statics.blotName && value) {
          (this.domNode as Element).setAttribute('data-value', value);
        } else {
          super.format(name, value);
        }
    }
}

export default EmbedLinkBlot;