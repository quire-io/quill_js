import { EmbedBlot } from 'parchment';
import { service } from '../service/quire';

class PhoneBlot extends EmbedBlot {
    static blotName = 'phone';
    static className = 'ql-phone';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create() as HTMLAnchorElement;
        node.setAttribute('href', service.getPhoneUrl(value));
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