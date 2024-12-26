import BlockBlot from 'quill/blots/block';

class SoftBreak extends BlockBlot {
    static blotName = 's-block';
    static tagName = 'div';
}

export default SoftBreak;