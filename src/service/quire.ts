
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
     * Returns whether allow replce current line with paragraph when press Enter
     * @param format attributes of format
     */
    canReplaceParagraph(format: Record<string, unknown>): boolean;

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

    /**
     * Convert pasted HTML into Delta.
     * @param html HTML
     * @returns The result delta in JSON string. null if not supported.
     */
    convertHTML(html: string, format: Record<string, unknown>): string | null;

    /**
     * Convert pasted text into Delta.
     * @param text Text
     * @returns The result delta in JSON string. null if not supported.
     */
    convertText(text: string, format: Record<string, unknown>): string | null;
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

    canReplaceParagraph(format: Record<string, unknown>): boolean {
        return concrete?.canReplaceParagraph(format)
            ?? (format['header'] == null && format['list'] == null 
                && format['code-block'] == null 
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

    convertHTML(html: string, format: Record<string, unknown>): string | null {
        return concrete?.convertHTML(html, format);
    }

    convertText(text: string, format: Record<string, unknown>): string | null {
        return concrete?.convertText(text, format);
    }
}

const service: QuireQuillService = new QuireQuillServiceImpl();

export { service, registerService };