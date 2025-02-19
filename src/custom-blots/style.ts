import Inline from 'quill/blots/inline';
import parse from 'style-to-object';

class StyleBlot extends Inline {
    static blotName = 'style';
    static className = 'ql-style';
    static tagName = 'SPAN';

    static create(value: string) {
      const node = super.create();
      StyleBlot._updateNode(node, value);
      return node;
    }

    static _allowProperties = ['color', 
      'font-size', 'font-weight', 'font-style',
      'background-color',
      'text-decoration',
      'text-decoration-line',
      'text-decoration-style'];

    static _updateNode(node: Element, value: string) {
      var results = '';
      parse(value, (name, value, declaration) => {
        var allow = StyleBlot._allowProperties.includes(name);
        if (allow) {
          switch(name) {
            case 'color':
              //#21530: Don't override color for system colors
              allow = !node.className.split(' ')
                .some(name => name.startsWith('textcr-'));
              break;
            case 'font-size':
              allow = value != '14px';
              break;
            case 'font-weight':
              allow = value != '400';
              break;
          }
        }

        if (allow && value != 'normal' && value != 'initial') {
          results += `${name}:${value};`;
        }
      });
      // console.log(parse(value));
      // console.log(results);

      node.setAttribute('style', results);
      node.setAttribute('data-value', results);
  }

    static formats(node: HTMLElement) {
        return node.getAttribute('style');
    }

    format(name, value) {
        if (name === this.statics.blotName && value) {
          StyleBlot._updateNode(this.domNode as HTMLElement, value);
        } else {
          super.format(name, value);
        }
    }
}

export default StyleBlot;