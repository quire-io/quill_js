import { ScrollBlot } from 'parchment';
import EmbedBlot from 'quill/blots/embed';
//cannot extends EmbedBlot due to need override _saveValue
//import EmbedBlot from './embed';
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
        this.updateNode(element.children[0] as Element, Chart.value(element));
    }
    
    static create(value) {
        const node = super.create() as Element;
        autoDetach(node);//#22037
        node.setAttribute('data-sel-index', '1');
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
            this.updateNode((this.domNode as Element).children[0] as Element, value);
        } else {
            super.format(name, value);
        }
    }
}