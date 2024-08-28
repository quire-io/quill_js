import Embed from 'quill/blots/embed';
import { service } from '../service/quire';

class ReferBlot extends Embed {
    static blotName = 'refer';
    static className = 'ql-refer';
    static tagName = 'SPAN';

    static create(value) {
        const node = super.create() as Element;
        node.setAttribute('data-value', value.value);

        let children = service.renderRefer(value);
        node.replaceChildren(children);
        return node;
    }

    static value(node: Element) {
        return service.getReferValue(node);
    }
}

export default ReferBlot;