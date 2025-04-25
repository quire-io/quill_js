// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
//import EmbedBlot from 'quill/blots/embed';
import EmbedBlot from './embed';
import { autoDetach } from './embed';
import { service } from '../service/quire';

class MentionBlot extends EmbedBlot {
    static blotName = 'mention';
    static className = 'mention';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as Element;
        MentionBlot._updateNode(node, value);        
        autoDetach(node);//#22037
        
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }

    static _updateNode(node: Element, value: string) {
      node.setAttribute('data-value', value);
      node.setAttribute('contenteditable', `${service.isEnabled()}`);//#21509: for cursor visible

      let children = service.renderMention(value);
      node.replaceChildren(children);
    }

    format(name, value) {
      if (name === this.statics.blotName && value) {
        MentionBlot._updateNode(this.domNode as Element, value);
      } else {
        super.format(name, value);
      }
    }
}

export default MentionBlot;