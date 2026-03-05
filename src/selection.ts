import Selection from 'quill/core/selection';
export class SelectionExt extends Selection {
  setNativeRange(startNode: Node | null, startOffset?: number, 
        endNode?: Node | null, endOffset?: number | undefined, 
        force?: boolean): void {
    
    let safeEndNode = endNode;
    let safeEndOffset = endOffset;

    if (endNode) {
      // Determine the valid boundary of the node
      const maxLength = endNode.nodeType === Node.TEXT_NODE 
        ? (endNode as Text).length 
        : endNode.childNodes.length;

      // Fix the "4294967295" error by clamping the offset
      // If it's negative or larger than allowed, we cap it.
      if (typeof endOffset === 'number') {
        safeEndOffset = Math.max(0, Math.min(endOffset, maxLength));
      }
    }

    // Call the original implementation with the sanitized values
    super.setNativeRange(startNode, startOffset, safeEndNode, safeEndOffset, force);
  }
}