// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
//import EmbedBlot from 'quill/blots/embed';
import EmbedBlot from './embed';
import { getQuireService } from '../service/quire';

class FormulaBlot extends EmbedBlot {
    static blotName = 'formula';
    static className = 'ql-formula';
    static tagName = 'SPAN';

    updateNode(node: Element, value: string | null): void {
      super.updateNode(node, value);

      if (!value) return;

      node.setAttribute('contenteditable', `${this.service.isEnabled()}`);//#21509: for cursor visible

      let children = this.service.evaluateFormula(value);
      node.replaceChildren(children);
    }
}

export default FormulaBlot;