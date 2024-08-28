import EmbedBlot from 'quill/blots/embed';

class LoadingImage extends EmbedBlot {
    static blotName = 'loading-image';
    static tagName = 'DIV';
    static className = 'ql-loading-image';

    static value(domNode) {
        return true;
    }
}

export default LoadingImage;