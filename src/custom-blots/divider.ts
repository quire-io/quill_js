import { EmbedBlot } from 'parchment';

class DividerBlot extends EmbedBlot {
    static blotName = 'divider';
    static tagName = 'HR';

    static value(domNode: Element) {
        return 'hr';
    }
}

export default DividerBlot;