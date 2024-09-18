import { EmbedBlot } from 'parchment';

class LoadingImage extends EmbedBlot {
    static blotName = 'loading-image';
    static tagName = 'DIV';
    static className = 'ql-loading-image';

    static create(value: string) {
        const node = super.create(value) as Element;
        node.setAttribute('data-url', value);
        return node;
    }

    static value(domNode: Element): string {
        return domNode.getAttribute('data-url') ?? '';
    }
}

export default LoadingImage;