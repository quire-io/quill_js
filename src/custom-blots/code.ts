import { Code } from 'quill/formats/code';
import Break from 'quill/blots/break';
import Cursor from 'quill/blots/cursor';
import TextBlot from 'quill/blots/text';

export default class CodeBlot extends Code {

    static allowedChildren = [TextBlot, Break, Cursor];

    public format(name: string, value: any): void {
        //#20855: disable style for code block
        if (name === this.statics.blotName)
            super.format(name, value);
    }
}