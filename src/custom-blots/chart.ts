import { ScrollBlot } from 'parchment';
import EmbedBlot from 'quill/blots/embed';
import { QuireQuillService, getQuireService, autoDetach } from '../service/quire';

export default class Chart extends EmbedBlot {

    static blotName = 'chart';
    static className = 'ql-chart';
    static tagName = 'DIV';

    service: QuireQuillService;

    constructor(scroll: ScrollBlot, node: Node) {
        super(scroll, node);

        this.service = getQuireService(scroll.domNode);
        const element = node as Element;
        this.updateNode(element, Chart.value(element));
    }
    
    static create(value) {
        const node = super.create() as Element;
        autoDetach(node);//#22037
        Chart._saveValue(node, value);
        return node;
    }

    static value(domNode: Element) {
        return domNode.getAttribute('data-value');
    }

    static _saveValue(node: Element, value) {
        // Store map as JSON string in a data attribute
        node.setAttribute('data-value', 
            typeof value === 'string' ? value: JSON.stringify(value));
    }

    updateNode(node: Element, value): void {
        if (!value) return;

        let children = this.service.renderChart(
            typeof value === 'string' ? JSON.parse(value) : value);
        node.replaceChildren(children);
    }

    format(name, value) {
        if (name === this.statics.blotName && value) {
            const node = this.domNode as Element;
            Chart._saveValue(node, value);
            this.updateNode(node, value);
        } else {
            super.format(name, value);
        }
    }
}