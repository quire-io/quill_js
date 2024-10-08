import { EmbedBlot } from 'parchment';
import { service } from '../service/quire';

class EmailBlot extends EmbedBlot {
    static blotName = 'email';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create() as HTMLAnchorElement;
        node.setAttribute('href', service.getEmailUrl(value));
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