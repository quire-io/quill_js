import Embed from 'quill/blots/embed';
import { service } from '../service/quire';

class FormulaBlot extends Embed {
    static blotName = 'formula';
    static className = 'ql-formula';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as HTMLElement;
        node.setAttribute('data-value', value);

        let children = service.evaluateFormula(value);
        node.replaceChildren(children);
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }
}

export default FormulaBlot;