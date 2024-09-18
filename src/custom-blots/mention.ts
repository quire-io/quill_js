import { EmbedBlot } from 'parchment';
import { service } from '../service/quire';

class MentionBlot extends EmbedBlot {
    static blotName = 'mention';
    static className = 'mention';
    static tagName = 'SPAN';

    static create(value: string) {
        const node = super.create() as Element;
        node.setAttribute('data-value', value);

        let children = service.renderMention(value);
        node.replaceChildren(children);
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }
}

export default MentionBlot;