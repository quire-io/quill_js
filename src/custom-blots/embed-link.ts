import EmbedBlot from './embed';

class EmbedLinkBlot extends EmbedBlot {
    static blotName = 'embed';
    static className = 'ql-embed';
    static tagName = 'SPAN';

    updateNode(node: Element, value: string | null): void {
      super.updateNode(node, value);

      if (!value) return;

      node.setAttribute('contenteditable', 'false');
      let children = this.service.renderAutolink(value);
      node.replaceChildren(children);
    }
}

export default EmbedLinkBlot;