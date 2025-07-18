// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
//import EmbedBlot from 'quill/blots/embed';
import EmbedBlot from './embed';

class EmailBlot extends EmbedBlot {
    static blotName = 'email';
    static className = 'ql-email';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create(value);
        node.setAttribute('target', '_blank');
        return node;
    }

    updateNode(node: Element, value: string | null): void {
      super.updateNode(node, value);

      if (!value) return;

      node.parentElement?.setAttribute('href', this.service.getEmailUrl(value));
      node.textContent = value;
    }
} 
 
export default EmailBlot;