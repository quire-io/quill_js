import Inline from 'quill/blots/inline';

const label = 'textcr-';

class ColorBlot extends Inline {
    static blotName = 'color';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create(value);
        node.className = `lb ${label}${value}`;
        return node;
    }

    static formats(node: HTMLElement) {
        let foundValue = '';
        for (const className of node.classList) {
            if (className.startsWith(label)) {   
                foundValue = className.substring(label.length);  
                break;
            }
        }
        return foundValue;
    }
}

export default ColorBlot;