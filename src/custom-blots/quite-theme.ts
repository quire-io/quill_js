import type Quill from "quill/core/quill";
import type { ThemeOptions } from "quill/core/theme";
import BaseTheme from "quill/themes/base";

class QuireTheme extends BaseTheme {
    constructor(quill: Quill, options: ThemeOptions) {
        super(quill, options);
        this.quill.container.classList.add('ql-quire');
        this.quill.root.classList.add('t-desc-block');
    }
}

export default QuireTheme;