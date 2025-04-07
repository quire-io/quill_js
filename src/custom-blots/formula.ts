// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
//import EmbedBlot from 'quill/blots/embed';
import EmbedBlot from './embed';
import { service } from '../service/quire';

class FormulaBlot extends EmbedBlot {
    static blotName = 'formula';
    static className = 'ql-formula';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as HTMLElement;
        node.setAttribute('data-value', value);
        node.setAttribute('contenteditable', `${service.isEnabled()}`);//#21509: for cursor visible

        let children = service.evaluateFormula(value);
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

export default FormulaBlot;