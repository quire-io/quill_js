
/**
 * A service that request info from Quire.
 */
interface QuireQuillService {

    /**
     * Returns quire url for special cases, e.g #task-id
     * @param url a url string
     */
    toQuireUrl(url: string): string

    /**
     * Returns whether is quire workspace url
     * @param url a url string
     */
    isQuireUrl(url: string): boolean;

    /**
     * Returns whether allow append paragraph when press Enter
     * @param format attributes of format
     */
    canAddParagraph(format: Record<string, unknown>): boolean;
    
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
    
    toQuireUrl(url: string): string {
        return concrete?.toQuireUrl(url)
            ?? url;
    }

    isQuireUrl(url: string): boolean {
        return concrete?.isQuireUrl(url)
            ?? url.startsWith('https://quire.io/w/');
    }

    canAddParagraph(format: Record<string, unknown>): boolean {
        return concrete?.canAddParagraph(format)
            ?? (format['header'] == null && format['list'] == null 
                && format['code'] == null  && format['code-block'] == null 
                && format['blockquote'] == null
                && format['nested-blockquote'] == null);
    }

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