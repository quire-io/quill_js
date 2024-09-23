import { ClassAttributor, Scope } from 'parchment';

const textColorRowSpan = 4;
const textColorColSpan = 8;

function* textColors() {
  for (var i = 0; i < textColorRowSpan; i++) {
    for (var j = 0; j < textColorColSpan; j++) {
      yield `${i}${j}`;
    }
  }
}

const ColorClass = new ClassAttributor('color', 'textcr', {
  scope: Scope.INLINE,
  whitelist: [...textColors()],
});

export default ColorClass;