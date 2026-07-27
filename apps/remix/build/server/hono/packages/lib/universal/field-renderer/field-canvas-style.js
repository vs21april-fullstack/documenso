import 'colord';

/**
 * Resolve the canvas style for a field by reading a throwaway probe element's
 * computed CSS.
 *
 * Sign-mode only — the editor and export views intentionally use the renderer
 * defaults. Reads are cache-gated, so the probe is created/removed at most once
 * per unique field state per render pass.
 */
const resolveFieldCanvasStyle = (field, mode, cache) => {
  {
    return undefined;
  }
};

export { resolveFieldCanvasStyle };
//# sourceMappingURL=field-canvas-style.js.map
