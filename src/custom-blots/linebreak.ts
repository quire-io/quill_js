import BlockBlot from 'quill/blots/block';

class SoftBreak extends BlockBlot {
    static blotName = 'line';
    static tagName = 'div';
}

export default SoftBreak;