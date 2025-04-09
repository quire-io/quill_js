// import { EmbedBlot } from 'parchment';//#21509: Replace with EmbedBlot
import { ScrollBlot } from 'parchment';
import EmbedBlot from 'quill/blots/embed';


class Embed extends EmbedBlot {
  constructor(scroll: ScrollBlot, node: Node) {
    super(scroll, node);
    (this.domNode as Element).setAttribute('data-sel-index', '1');
  } 

  static autoDetach(element: Element) {
    const observer = new MutationObserver((mutations) => {
      if (!element.innerHTML.trim().length)
        element.remove();
    });
  
    observer.observe(element, {
      childList: true,
      subtree: true, // Optional: detect nested changes
    });
  }
}

export default Embed;