import ListItem from "quill/formats/list";
import { convertHTML } from "../service/editor";

export default class ListBlot extends ListItem {
    static register() {
        // avoid duplicate registration
    }

    html(index: number, length: number): string {
        const format = ListItem.formats(this.domNode);
        const parts: string[] = format === 'checked' || format === 'unchecked'
            ? [`<input type="checkbox"${format === 'checked' ? ' checked' : ''}>`]
            : [];
        this.children.forEachAt(index, length, (child, offset, childLength) => {
            parts.push(convertHTML(child, offset, childLength));
        });
        return parts.join('');
    }
}