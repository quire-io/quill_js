import BlockBlot from 'quill/blots/block';

class PBlot extends BlockBlot {
    static blotName = 'p-block';
    static tagName = 'p';
}

export default PBlot;