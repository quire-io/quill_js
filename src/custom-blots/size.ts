import { ClassAttributor, Scope } from 'parchment';

const SizeClass = new ClassAttributor('size', 'textsz', {
  scope: Scope.INLINE,
  whitelist: ['s', 'l', 'xl'],
});

export default SizeClass;