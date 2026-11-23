import Emitter, { type EmitterSource } from 'quill/core/emitter';
import Selection, { type Range } from 'quill/core/selection';

function clampOffset(node: Node | null, offset: number): number {
  if (node == null)
    return offset;

  const max = node.nodeType === Node.TEXT_NODE ?
    (node as Text).length : node.childNodes.length;
  return Math.max(0, Math.min(offset, max));
}

// Quill's constructor hard-wires `new Selection`, so patch the class.
// The DOM may change between rangeToNative and setStart (e.g. root.focus()
// handlers), which throws IndexSizeError: retry on the live DOM, clamped.
// setRange only: Quill's own restore (setNativeRange) relies on failing after an embed.
Selection.prototype.setRange = function (this: Selection, range: Range | null,
    force: boolean | EmitterSource = false, source: EmitterSource = Emitter.sources.API): void {
  if (typeof force === 'string') {
    source = force;
    force = false;
  }

  if (range == null) {
    this.setNativeRange(null);
  } else {
    const [startNode, startOffset, endNode, endOffset] = this.rangeToNative(range);
    try {
      this.setNativeRange(startNode, startOffset, endNode, endOffset, force);
    } catch (e) {
      if (!(e instanceof DOMException) || e.name !== 'IndexSizeError')
        throw e;

      const [sn, so, en, eo] = this.rangeToNative(range);
      this.setNativeRange(sn, clampOffset(sn, so), en, clampOffset(en, eo), force);
    }
  }
  this.update(source);
} as typeof Selection.prototype.setRange;
