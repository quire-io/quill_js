import BlockBlot from 'quill/blots/block';

class NestedBlockquote extends BlockBlot {
    static blotName = 'nested-blockquote';
    static className = 'ql-nested-blockquote';
    static tagName = 'blockquote';

    static create(value: string) {
        const node = super.create();
        node.setAttribute('data-nested-blockquote', value);
        //node.classList.add('nested-blockquote');
        node.style.setProperty('--nested-blockquote', value);
        return node;
    }

    static formats(node) {
        return Number(node.getAttribute('data-nested-blockquote'));
    }

    // static value(domNode: Element) {
    //     return domNode.getAttribute('data-value');
    // }
}

export default NestedBlockquote;