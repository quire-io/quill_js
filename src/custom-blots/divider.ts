/// Test cases: 
///     Press left then delete
///     Press up then delete

// It will make divider overlap with text
// import BlockBlot from 'quill/blots/block';
// class DividerBlot extends BlockBlot {

/// delete not works well between text and hr
// import { EmbedBlot } from 'parchment';
import { BlockEmbed } from 'quill/blots/block';

class DividerBlot extends BlockEmbed {
    static blotName = 'divider';
    static className = 'ql-divider';
    static tagName = 'HR';
}

export default DividerBlot;