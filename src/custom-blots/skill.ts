import EmbedBlot from './embed';
import { escapeText } from 'quill/blots/text';

/**
 * A skill picked in the Quire AI chat's `/` picker: `/name`, deleted as a
 * whole. The value is the skill's name, `org:` in front for the
 * organization's (a name has no `:`).
 */
class SkillBlot extends EmbedBlot {
    static blotName = 'skill';
    static className = 'ql-skill';
    static tagName = 'SPAN';

    updateNode(node: Element, value: string | null): void {
      super.updateNode(node, value);

      if (!value) return;

      node.replaceChildren(new Text(SkillBlot.text(value)));
    }

    /** Copied as the text typed, so a paste -- into a task, say -- is text. */
    html(): string {
      const value = SkillBlot.value(this.domNode as Element);
      return value ? escapeText(SkillBlot.text(value)) : '';
    }

    static text(value: string): string {
      return '/' + value.slice(value.indexOf(':') + 1);
    }
}

export default SkillBlot;
