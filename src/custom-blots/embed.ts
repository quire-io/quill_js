// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
import { ScrollBlot } from 'parchment';
import EmbedBlot from 'quill/blots/embed';
import { QuireQuillService, getQuireService, autoDetach } from '../service/quire';


class Embed extends EmbedBlot {

  service: QuireQuillService;

  constructor(scroll: ScrollBlot, node: Node) {
    super(scroll, node);
    
    this.service = getQuireService(scroll.domNode);

    const element = node as Element;
    this.updateNode(element, Embed.value(element));
  }

  static create(value: string) {
    const node = super.create() as Element;
    autoDetach(node);//#22037
    node.setAttribute('data-sel-index', '1');
    node.setAttribute('data-value', value);
    
    return node;
  }

  static value(domNode: Element) {
    return domNode.getAttribute('data-value');
  }

  format(name: string, value: any) {
    if (name === this.statics.blotName && value) {
      this.updateNode(this.domNode as Element, value);
    } else {
      super.format(name, value);
    }
  }

  updateNode(node: Element, value: string | null): void {
    if (value)
      node.setAttribute('data-value', value);
    else
      node.removeAttribute('data-value');
  }
}

export default Embed;