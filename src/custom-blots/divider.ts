import { BlockEmbed } from 'quill/blots/block';

class DividerBlot extends BlockEmbed {
    static blotName = 'divider';
    static tagName = 'HR';

    static value(domNode: Element) {
        return 'hr';
    }
}

export default DividerBlot;