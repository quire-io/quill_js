import Embed from 'quill/blots/embed';
import { service } from '../service/quire';

class MentionBlot extends Embed {
    static blotName = 'mention';
    static tagName = 'A';

    static create(value) {
        const node = super.create() as Element,
            url = value.href;
        node.setAttribute('data-value', value.value);

        node.setAttribute('class', 'mention');
        node.textContent = value.name;

        if (url)
            node.setAttribute('href', url);
        
        return node;
    }

    static value(node) {
        const url = node.getAttribute('href'),
            data = {
                name: node.textContent,
                value: node.getAttribute('data-value'),
            };
        if (url)
            data['href'] = url;
        return data;
    }
}

export default MentionBlot;