
/**
 * A service that request info from Quire.
 */
interface QuireQuillService {
    /**
     * Evaluate formula and turn into DOM nodes.
     * @param formula a formula string
     */
    evaluateFormula(formula: string): Node;

    /**
     * Render refer HTML into DOM nodes.
     * @param value the refer string
     */
    renderRefer(value): Node;

    /**
     * Retuerns refer data
     * @param node 
     */
    getReferValue(node: Element)

    /**
     * Render autolink HTML into DOM nodes.
     * @param value the refer string
     */
    renderAutolink(value: Map<string, string>): Node;

    /**
     * Retuerns autolink data
     * @param node 
     */
    getAutolinkValue(node: Element)


    /**
     * Get the email link href.
     * @param value email
     */
    getEmailUrl(value: string): string;

    /**
     * Get the phone link href.
     * @param value phone
     */
    getPhoneUrl(value: string): string;

    /**
     * Query a list of possible autocomplete candidates.
     * @param value a query string
     */
    getAutocompleteCandidates(value: string): string[];
}

var concrete: QuireQuillService;

function registerService(instance: any) {
    concrete = instance;
}

class QuireQuillServiceImpl implements QuireQuillService {
    getEmailUrl(value: string): string {
        return concrete?.getEmailUrl(value)
            ?? `mailto:${value}`;
    }

    getPhoneUrl(value: string): string {
        return concrete?.getPhoneUrl(value)
            ?? `tel:${value}`;
    }

    evaluateFormula(formula: string): Node {
        return concrete?.evaluateFormula(formula)
            ?? new Text(formula);
    }

    renderRefer(value): Node {
        var node = concrete?.renderRefer(value);
        if (node) return node;

        node = new Text(value.value);

        var url = value.href;
        if (url) {
            var anchor = document.createElement('a');
            anchor.textContent = value.name ?? value.value;
            anchor.setAttribute('href', value.value);
            node = anchor;
        }

        return node;
    }

    getReferValue(node: Element) {
        var value = concrete?.getReferValue(node);
        if (value) return value;

        value = {
            name: node.textContent,
            value: node.getAttribute('data-value')};
        var url = value.href;
        if (url)
            value.href = url;

        return value;
    }

    renderAutolink(value): Node {
        var node = concrete?.renderAutolink(value);
        if (node) return node;

        node = new Text(value.value);
        var url = value.href;
        if (url) {
            var anchor = document.createElement('a');
            anchor.textContent = value.name ?? value.value;
            anchor.setAttribute('href', value.value);
            node = anchor;
        }

        return node;
    }

    getAutolinkValue(node: Element) {
        var value = concrete?.getAutolinkValue(node);
        if (value) return value;

        value = {
            name: node.textContent,
            value: node.getAttribute('data-value')};
        var url = value.href;
        if (url)
            value.href = url;

        return value;
    }
    
    getAutocompleteCandidates(value: string): string[] {
        return concrete?.getAutocompleteCandidates(value)
            ?? [value];
    }
}

const service: QuireQuillService = new QuireQuillServiceImpl();

export { service, registerService };