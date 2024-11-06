
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
    renderRefer(value: string): Node;

    /**
     * Render autolink HTML into DOM nodes.
     * @param value the url string
     */
    renderAutolink(value: string): Node;

    /**
     * Render mention HTML into DOM nodes.
     * @param value the mention string
     */
    renderMention(value: string): Node;

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

    renderRefer(value: string): Node {
        return concrete?.renderRefer(value)
            ?? new Text(value);
    }

    renderAutolink(value: string): Node {
        return concrete?.renderAutolink(value)
            ?? new Text(value);
    }

    renderMention(value: string): Node {
        return concrete?.renderMention(value)
            ?? new Text(value);
    }
}

const service: QuireQuillService = new QuireQuillServiceImpl();

export { service, registerService };