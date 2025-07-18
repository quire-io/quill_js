// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
//import EmbedBlot from 'quill/blots/embed';
import EmbedBlot from './embed';

class AutolinkBlot extends EmbedBlot {
    static blotName = 'autolink';
    static className = 'ql-autolink';
    static tagName = 'SPAN';

    updateNode(node: Element, value: string | null): void {
      super.updateNode(node, value);

      if (!value) return;

      let children = this.service.renderAutolink(value);
      node.replaceChildren(children);
    }
}

export default AutolinkBlot;