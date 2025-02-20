// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
import EmbedBlot from 'quill/blots/embed';
import { service } from '../service/quire';

class PhoneBlot extends EmbedBlot {
    static blotName = 'phone';
    static className = 'ql-phone';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create() as HTMLAnchorElement;
        
        node.setAttribute('contenteditable', 'true');//#21509: for cursor visible
        node.setAttribute('target', '_blank');

        PhoneBlot._updateNode(node, value);
        
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }

    static _updateNode(node: HTMLElement, value: string) {
        node.setAttribute('href', service.getPhoneUrl(value));
        node.setAttribute('data-value', value);
        node.innerText = value;
    }

    format(name, value) {
        if (name === this.statics.blotName && value) {
            PhoneBlot._updateNode(this.domNode as HTMLElement, value);
        } else {
          super.format(name, value);
        }
    }
} 
 
export default PhoneBlot;