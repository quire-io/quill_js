
import Quill from 'quill/core';
import Syntax from 'quill/modules/syntax';

export class SyntaxExt extends Syntax {

    constructor(quill: Quill, options: any) {
        super(quill, options);
    }

    initTimer() {
        let timer: ReturnType<typeof setTimeout> | null = null;
        this.quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            const value = this.quill.container.dataset['highlight'];
            if (value != 'disabled')//#21338: Turn off quill highlight for stop refocus
              this.highlight();
            else
              delete this.quill.container.dataset.highlight;

            timer = null;
          }, this.options.interval);
        });
      }

}
