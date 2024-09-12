import { ClassAttributor, Scope } from 'parchment';

const ColorClass = new ClassAttributor('color', 'textcr', {
  scope: Scope.INLINE,
});

export default ColorClass;