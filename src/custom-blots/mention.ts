// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
//import EmbedBlot from 'quill/blots/embed';
import EmbedBlot from './embed';

class MentionBlot extends EmbedBlot {
    static blotName = 'mention';
    static className = 'mention';
    static tagName = 'SPAN';

    updateNode(node: Element, value: string | null): void {
      super.updateNode(node, value);

      if (!value) return;

      let children = this.service.renderMention(value);
      node.replaceChildren(children);
    }
}

export default MentionBlot;