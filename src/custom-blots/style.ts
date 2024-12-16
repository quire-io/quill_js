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

    format(name, value) {
        if (name === StyleBlot.blotName && value) {
          (this.domNode as Element).setAttribute('style', value);
        } else {
          super.format(name, value);
        }
    }
}

export default StyleBlot;