// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
//import EmbedBlot from 'quill/blots/embed';
import EmbedBlot from './embed';
import { service } from '../service/quire';

class ReferBlot extends EmbedBlot {
    static blotName = 'refer';
    static className = 'ql-refer';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as Element;
        node.setAttribute('data-value', value);
        node.setAttribute('contenteditable', 'true');//#21509: for cursor visible

        let children = service.renderRefer(value);
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

export default ReferBlot;