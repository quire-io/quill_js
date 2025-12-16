import { Blot } from 'parchment';
import TextBlot from 'quill/blots/text';

class Text extends TextBlot {
    
    split(index: number, force?: boolean): Blot | null {
        if (index > this.length()) {
            return this.next;
        }
        return super.split(index, force);
    }
}

export default Text;