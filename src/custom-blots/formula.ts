import Embed from 'quill/blots/embed';

class FormulaBlot extends Embed {
    static blotName = 'formula';
    static className = 'ql-formula';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as HTMLElement;
        node.setAttribute('data-value', value);
        node.innerText = value; // TODO: evaluate formula
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }
}

export default FormulaBlot;