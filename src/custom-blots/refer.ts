import Embed from 'quill/blots/embed';

class ReferBlot extends Embed {
    static blotName = 'refer';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create() as Element;
        node.setAttribute('data-value', value);
        node.setAttribute('class', 'ref');
        node.setAttribute('href', value); // TODO: real url
        node.textContent = value;
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }
}

export default ReferBlot;