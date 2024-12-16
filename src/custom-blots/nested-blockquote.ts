import BlockBlot from 'quill/blots/block';

class NestedBlockquote extends BlockBlot {
    static blotName = 'nested-blockquote';
    static className = 'ql-nested-blockquote';
    static tagName = 'blockquote';

    static create(value: string) {
        const node = super.create();
        NestedBlockquote._updateNode(node, value);
        return node;
    }

    static formats(node) {
        return Number(node.getAttribute('data-nested-blockquote'));
    }

    static _updateNode(node: HTMLElement, value: string) {
        node.setAttribute('data-nested-blockquote', value);
        //node.classList.add('nested-blockquote');
        node.style.setProperty('--nested-blockquote', value);
    }

    // static value(domNode: Element) {
    //     return domNode.getAttribute('data-value');
    // }

    format(name, value) {
        if (name === NestedBlockquote.blotName && value) {
            NestedBlockquote._updateNode(this.domNode, value);
        } else {
          super.format(name, value);
        }
    }
}

export default NestedBlockquote;