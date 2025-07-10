
import Quill from 'quill';
import { QuillWithOptions } from '../editor';

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
     * Returns whether Quill is editable
     */
    isEnabled(): boolean;

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
     * Render chart HTML into DOM nodes.
     * @param value the chart data map
     */
    renderChart(value: Map<string, unknown>): Node;

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
    convertHTML(html: string, format: Record<string, unknown>, raw: string): string | null;

    /**
     * Convert pasted text into Delta.
     * @param text Text
     * @returns The result delta in JSON string. null if not supported.
     */
    convertText(text: string, format: Record<string, unknown>): string | null;
}
function getQuireService(node: Node): QuireQuillService {
    let cnt = (node as Element).closest('.ql-container');
    if (cnt) {
        let service = (Quill.find(cnt) as QuillWithOptions)?.service;
        if (service)
            return service;
    }

    return defaultService;
}

function findQuill(node: Node): Quill | null {
    let cnt = (node as Element).closest('.ql-container');
    if (cnt) return Quill.find(cnt) as Quill | null;
    return null;
}

function autoDetach(element: Element) {
  const observer = new MutationObserver((mutations) => {
    if (!element.innerHTML.trim().length)
      element.remove();
    else {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            // Handle child list changes
            for (const addedNode of mutation.addedNodes) {
                if (addedNode.parentElement == element 
                    && addedNode instanceof Text) {
                    
                  element.parentElement?.appendChild(addedNode);

                  setTimeout(() => {
                    const quill = findQuill(element);
                    const blot = quill?.scroll.find(addedNode)
                    if (blot) {
                        quill?.setSelection((blot.offset(quill?.scroll) || 0) 
                            + blot.length(), 'silent');  
                    }
                  }, 0);
                }
            }
        }
    }
    }
  });

  observer.observe(element, {
    childList: true,
    subtree: true, // Optional: detect nested changes
  });
}

class QuireQuillServiceImpl implements QuireQuillService {
    
    toQuireUrl(url: string): string {
        return url;
    }

    isQuireUrl(url: string): boolean {
        return url.startsWith('https://quire.io/w/');
    }

    isEnabled(): boolean {
        return true;
    }

    canReplaceParagraph(format: Record<string, unknown>): boolean {
        return format['header'] == null && format['list'] == null 
            && format['code-block'] == null 
            && format['blockquote'] == null
            && format['nested-blockquote'] == null;
    }

    getEmailUrl(value: string): string {
        return `mailto:${value}`;
    }

    getPhoneUrl(value: string): string {
        return `tel:${value}`;
    }

    evaluateFormula(formula: string): Node {
        return new Text(formula);
    }

    renderRefer(value: string): Node {
        return new Text(value);
    }

    renderAutolink(value: string): Node {
        return new Text(value);
    }

    renderMention(value: string): Node {
        return new Text(value);
    }

    renderChart(value: Map<string, unknown>): Node {
        return new Text(JSON.stringify(value));
    }

    convertHTML(html: string, format: Record<string, unknown>, raw: string): string | null {
        return null;
    }

    convertText(text: string, format: Record<string, unknown>): string | null {
        return null;
    }
}

const defaultService: QuireQuillService = new QuireQuillServiceImpl();


// export { service, registerService };
export { getQuireService, defaultService, QuireQuillService, autoDetach};