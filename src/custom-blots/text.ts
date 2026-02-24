import { Blot } from 'parchment';
import TextBlot from 'quill/blots/text';

class Text extends TextBlot {
    
    split(index: number, force?: boolean): Blot | null {
        if (index >= this.length()) {
            return this.next;//#24088: the maximum value for a 32-bit unsigned integer
        }

        try {
            return super.split(index, force);
        } catch (e) {
            return this.next;//#24088: the maximum value for a 32-bit unsigned integer
        }
    }
}

export default Text;