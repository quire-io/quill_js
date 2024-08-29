
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
     * Get the mention URL.
     * @param value the mention string
     */
    getMentionUrl(value: string): string;


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

    renderRefer(value: string): Node {
        return concrete?.renderRefer(value)
            ?? new Text(value);
    }

    renderAutolink(value: string): Node {
        return concrete?.renderAutolink(value)
            ?? new Text(value);
    }
    

    getMentionUrl(value: string): string {
        return concrete?.getMentionUrl(value)
            ?? 'https://quire.io/u/' + value.substring(1);
    }

    getAutocompleteCandidates(value: string): string[] {
        return concrete?.getAutocompleteCandidates(value)
            ?? [value];
    }
}

const service: QuireQuillService = new QuireQuillServiceImpl();

export { service, registerService };