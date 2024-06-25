import Embed from 'quill/blots/embed';

class MentionBlot extends Embed {
    static blotName = 'mention';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create() as Element;
        node.textContent = value;
        node.setAttribute('class', 'mention');
        node.setAttribute('href', 'value'); // TODO: Use a real URL for the mention
        node.setAttribute('data-value', value);
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }
}

export default MentionBlot;