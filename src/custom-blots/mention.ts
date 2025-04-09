// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
//import EmbedBlot from 'quill/blots/embed';
import EmbedBlot from './embed';
import { service } from '../service/quire';

class MentionBlot extends EmbedBlot {
    static blotName = 'mention';
    static className = 'mention';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as Element;
        node.setAttribute('data-value', value);
        node.setAttribute('contenteditable', `${service.isEnabled()}`);//#21509: for cursor visible
        EmbedBlot.autoDetach(node);//#22037

        let children = service.renderMention(value);
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

export default MentionBlot;