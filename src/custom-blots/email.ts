import Embed from 'quill/blots/embed';

class EmailBlot extends Embed {
    static blotName = 'email';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create() as HTMLAnchorElement;
        node.setAttribute('href', `mailto:${value}`);
        node.setAttribute('data-value', value);
        node.setAttribute('target', '_blank');
        node.innerText = value;
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }
} 
 
export default EmailBlot;