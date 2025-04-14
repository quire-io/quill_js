import { EmbedBlot } from 'parchment';
import { autoDetach } from './embed';
import { service } from '../service/quire';

class EmbedLinkBlot extends EmbedBlot {
    static blotName = 'embed';
    static className = 'ql-embed';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as HTMLAnchorElement;
        EmbedLinkBlot._updateNode(node, value);
        autoDetach(node);//#22037
        
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }

    static _updateNode(node: Element, value: string) {
      node.setAttribute('data-value', value);
      node.setAttribute('contenteditable', 'false');

      let children = service.renderAutolink(value);
      node.replaceChildren(children);
    }

    format(name, value) {
        if (name === this.statics.blotName && value) {
          EmbedLinkBlot._updateNode(this.domNode as Element, value);
        } else {
          super.format(name, value);
        }
    }
}

export default EmbedLinkBlot;