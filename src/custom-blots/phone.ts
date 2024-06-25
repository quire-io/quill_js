import Embed from 'quill/blots/embed';

class PhoneBlot extends Embed {
    static blotName = 'phone';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create() as HTMLAnchorElement;
        node.setAttribute('href', `tel:${value}`);
        node.setAttribute('data-value', value);
        node.setAttribute('target', '_blank');
        node.innerText = value;
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }
} 
 
export default PhoneBlot;