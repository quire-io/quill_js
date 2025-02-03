import Container from 'quill/blots/container';
import BlockBlot from 'quill/blots/block';
import { escapeText } from 'quill/blots/text';

class BlockquoteContainer extends Container {
    static blotName = 'blockquote-container';
    static className = 'ql-blockquote-container';
    static tagName = 'DIV';

    blockquote(index: number, length: number) {
      const len = this.children.length - 1,
        text = this.children
        // @ts-expect-error
        .map((child) => (child.length() <= 1 ? '' : child.domNode.innerText))
        .join('\n')
        .slice(index, index + length)

      let i = -1
      return `<p>${
        text.split('\n')
          .map((line) => {
            i++;
            return `${escapeText(line)}${i == len ? '': '<br>'}`
          })
          .join('')
        }<p>`;
    }
  
    html(index: number, length: number) {
      // `\n`s are needed in order to support empty lines at the beginning and the end.
      // https://html.spec.whatwg.org/multipage/syntax.html#element-restrictions
      // return `<div>\n${escapeText(this.blockquote(index, length))}\n</div>`;
      return `<blockquote>\n${this.blockquote(index, length)}\n</blockquote>`;
    }
  }

class Blockquote extends BlockBlot {
    static blotName = 'blockquote';
    static tagName = 'blockquote';

    static requiredContainer = BlockquoteContainer;
}

BlockquoteContainer.allowedChildren = [Blockquote];

export default Blockquote;