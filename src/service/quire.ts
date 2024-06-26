
/**
 * A service that request info from Quire.
 */
interface QuireQuillService {
    /**
     * Evaluate formula and turn into DOM nodes.
     * @param formula a formula string
     */
    evaluateFormula(formula: string): Node[];

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


class QuireQuillServiceImpl implements QuireQuillService {
    private concrete: QuireQuillService;

    constructor() {
        if (typeof window !== 'undefined')
            this.concrete = window['QuillService'];

        if (!this.concrete)
            console.warn('No window.QuillService available. Use fallback instead.')
    }

    getEmailUrl(value: string): string {
        return this.concrete?.getEmailUrl(value)
            ?? `mailto:${value}`;
    }

    getPhoneUrl(value: string): string {
        return this.concrete?.getPhoneUrl(value)
            ?? `tel:${value}`;
    }

    evaluateFormula(formula: string): Node[] {
        return this.concrete?.evaluateFormula(formula)
            ?? [new Text(formula)];
    }

    getReferUrl(value: string): string {
        return this.concrete?.getReferUrl(value)
            ?? 'https://quire.io/u/' + value;
    }

    isReferActive(value: string): boolean {
        return this.concrete?.isReferActive(value)
            ?? true;
    }

    getAutocompleteCandidates(value: string): string[] {
        return this.concrete?.getAutocompleteCandidates(value)
            ?? [value];
    }
}

const service: QuireQuillService = new QuireQuillServiceImpl();

export { service };