import Selection from 'quill/core/selection';
export class SelectionExt extends Selection {
  setNativeRange(startNode: Node | null, startOffset?: number, 
        endNode: Node | null = null, // Default to null to satisfy the type
        endOffset?: number, 
        force?: boolean): void {
    
    // 1. Ensure we have fallback values for the offsets
    const safeStartOffset = this.getValidOffset(startNode, startOffset);
    const safeEndOffset = this.getValidOffset(endNode, endOffset);

    // 2. Call super with explicit values
    super.setNativeRange(startNode, safeStartOffset, 
      endNode, safeEndOffset, force);
  }

  getValidOffset(node: Node | null, offset?: number): number {
    if (!node || offset === undefined) return 0;
    
    // Use character count for Text, child count for Elements
    const max = node.nodeType === Node.TEXT_NODE 
        ? (node as Text).length 
        : node.childNodes.length;
    
    return Math.max(0, Math.min(offset, max));
  }
}