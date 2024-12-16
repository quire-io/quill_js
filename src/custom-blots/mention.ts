import { EmbedBlot } from 'parchment';
import { service } from '../service/quire';

class MentionBlot extends EmbedBlot {
    static blotName = 'mention';
    static className = 'mention';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as Element;
        node.setAttribute('data-value', value);
        node.setAttribute('contenteditable', 'false');

        let children = service.renderMention(value);
        node.replaceChildren(children);
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }

    format(name, value) {
        if (name === MentionBlot.blotName && value) {
          (this.domNode as Element).setAttribute('data-value', value);
        } else {
          super.format(name, value);
        }
    }
}

export default MentionBlot;