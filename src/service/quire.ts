
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
     * Get the referring URL.
     * @param value the refer string
     */
    getReferUrl(value: string): string;

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
     * Test if the refer is still active.
     * @param value refer string
     */
    isReferActive(value: string): boolean;

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

    getReferUrl(value: string): string {
        return concrete?.getReferUrl(value)
            ?? 'https://quire.io/u/' + value;
    }

    isReferActive(value: string): boolean {
        return concrete?.isReferActive(value)
            ?? true;
    }

    getAutocompleteCandidates(value: string): string[] {
        return concrete?.getAutocompleteCandidates(value)
            ?? [value];
    }
}

const service: QuireQuillService = new QuireQuillServiceImpl();

export { service, registerService };