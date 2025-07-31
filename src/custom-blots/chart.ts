// import { ScrollBlot, EmbedBlot } from 'parchment';
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
        this.updateNode(element.children[0], Chart.value(element));
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

        let chart = this.service.renderChart(
            typeof value === 'string' ? JSON.parse(value) : value) as Element;
        chart.setAttribute('contenteditable', 'false');
        node.replaceChildren(chart);
    }

    format(name, value) {
        if (name === this.statics.blotName && value) {
            const node = this.domNode as Element;
            Chart._saveValue(node, value);
            this.updateNode(node.children[0], value);
        } else {
            super.format(name, value);
        }
    }

    html(index: number, length: number) {
        const node = (this.domNode as Element).querySelector('.quill-chart'),
            value = node?.getAttribute('data-value'),
            link = node?.getAttribute('data-link') || '#',
            title = node?.getAttribute('data-title') || 'Untitled';
        return `<a class="ql-chart" data-value='${value}' href="${link}">${title}</a>`;
    }
}