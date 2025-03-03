// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
import { ScrollBlot } from 'parchment';
import EmbedBlot from 'quill/blots/embed';


class Embed extends EmbedBlot {
  constructor(scroll: ScrollBlot, node: Node) {
    super(scroll, node);
    (this.domNode as Element).setAttribute('data-sel-index', '1');
  } 
}

export default Embed;