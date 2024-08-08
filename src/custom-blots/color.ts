import Inline from 'quill/blots/inline';

const label = 'textcr-';

class ColorBlot extends Inline {
    static blotName = 'color';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create(value);
        node.className = `${label}${value}`;
        return node;
    }

    static formats(node: HTMLElement) {
        const className = node.className;
        return className.startsWith(label) ? className.substring(label.length) : '';
    }
}

export default ColorBlot;