import { Blot } from 'parchment';
import TextBlot from 'quill/blots/text';

class Text extends TextBlot {
    
    split(index: number, force?: boolean): Blot | null {
        const len = this.domNode.length;
        return super.split(index > len ? len: index, force);
    }
}

export default Text;