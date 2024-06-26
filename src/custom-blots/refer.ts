import Embed from 'quill/blots/embed';
import { service } from '../service/quire';

class ReferBlot extends Embed {
    static blotName = 'refer';
    static tagName = 'A';

    static create(value: string) {
        const node = super.create() as Element;
        node.setAttribute('data-value', value);

        let active = service.isReferActive(value);
        node.setAttribute('disabled', active ? '' : 'disabled');
        node.setAttribute('class', 'ref');
        node.setAttribute('href', service.getReferUrl(value));
        node.textContent = value;
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }
}

export default ReferBlot;