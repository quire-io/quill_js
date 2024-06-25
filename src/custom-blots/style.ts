import Inline from 'quill/blots/inline';

class StyleBlot extends Inline {
    static blotName = 'style';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create();
        node.setAttribute('style', value);
        return node;
    }

    static formats(node: HTMLElement) {
        return node.getAttribute('style');
    }
}

export default StyleBlot;