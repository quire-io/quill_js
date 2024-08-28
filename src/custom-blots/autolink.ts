import Embed from 'quill/blots/embed';
import { service } from '../service/quire';

class AutolinkBlot extends Embed {
    static blotName = 'autolink';
    static className = 'ql-autolink';
    static tagName = 'SPAN';

    static create(value) {
        const node = super.create() as HTMLAnchorElement;
        node.setAttribute('data-value', value.value);
        
        let children = service.renderAutolink(value);
        node.replaceChildren(children);
        return node;
    }

    static value(node) {
        return service.getAutolinkValue(node);
    }
}

export default AutolinkBlot;