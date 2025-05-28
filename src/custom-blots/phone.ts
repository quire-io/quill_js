// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
//import EmbedBlot from 'quill/blots/embed';
import EmbedBlot from './embed';
import { getQuireService } from '../service/quire';

class PhoneBlot extends EmbedBlot {
    static blotName = 'phone';
    static className = 'ql-phone';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create(value)
        
        node.setAttribute('target', '_blank');
        
        return node;
    }

    updateNode(node: Element, value: string | null): void {
      super.updateNode(node, value);

      if (!value) return;

      node.setAttribute('contenteditable', `${this.service.isEnabled()}`);//#21509: for cursor visible
      node.setAttribute('href', this.service.getPhoneUrl(value));
      node.textContent = value;
    }
} 
 
export default PhoneBlot;