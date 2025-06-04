import ImageBlot from 'quill/formats/image';

export default class Image extends ImageBlot {
    static create(value) {
        const node = super.create(value);
        node.classList.add('ql-image-loading');
        node.addEventListener('load', () => {
            node.classList.remove('ql-image-loading');
        });
        node.addEventListener('error', () => {
            node.classList.remove('ql-image-loading');
            node.classList.add('ql-image-error');
        });
        return node;
    }
}