import { DEFAULT_RECT_BACKGROUND, getRecipientColorStyles } from '../../../ui/lib/recipient-colors.js';
import Konva from 'konva';
import { calculateFieldPosition } from './field-renderer.js';

const konvaTextFontFamily = '"Noto Sans", "Noto Sans Japanese", "Noto Sans Chinese", "Noto Sans Korean", sans-serif';
const konvaTextFill = 'black';
const upsertFieldGroup = (field, options) => {
  const {
    pageWidth,
    pageHeight,
    pageLayer,
    editable,
    scale
  } = options;
  const {
    fieldX,
    fieldY,
    fieldWidth,
    fieldHeight
  } = calculateFieldPosition(field, pageWidth, pageHeight);
  const fieldGroup = pageLayer.findOne(`#${field.renderId}`) || new Konva.Group({
    id: field.renderId,
    name: 'field-group'
  });
  const maxXPosition = (pageWidth - fieldWidth) * scale;
  const maxYPosition = (pageHeight - fieldHeight) * scale;
  fieldGroup.setAttrs({
    scaleX: 1,
    scaleY: 1,
    x: fieldX,
    y: fieldY,
    draggable: editable,
    opacity: options.fieldCanvasStyle?.opacity ?? 1,
    dragBoundFunc: pos => {
      const newX = Math.max(0, Math.min(maxXPosition, pos.x));
      const newY = Math.max(0, Math.min(maxYPosition, pos.y));
      return {
        x: newX,
        y: newY
      };
    }
  });
  return fieldGroup;
};
const upsertFieldRect = (field, options) => {
  const {
    pageWidth,
    pageHeight,
    mode,
    pageLayer,
    color
  } = options;
  const {
    fieldCanvasStyle
  } = options;
  const {
    fieldWidth,
    fieldHeight
  } = calculateFieldPosition(field, pageWidth, pageHeight);
  const fieldRect = pageLayer.findOne(`#${field.renderId}-rect`) || new Konva.Rect({
    id: `${field.renderId}-rect`,
    name: 'field-rect'
  });
  fieldRect.setAttrs({
    width: fieldWidth,
    height: fieldHeight,
    fill: fieldCanvasStyle?.backgroundColor ?? DEFAULT_RECT_BACKGROUND,
    stroke: fieldCanvasStyle?.borderColor ?? (color ? getRecipientColorStyles(color).baseRing : '#e5e7eb'),
    strokeWidth: fieldCanvasStyle?.borderWidth ?? 2,
    cornerRadius: fieldCanvasStyle?.borderRadius ?? 2,
    strokeScaleEnabled: false,
    visible: mode !== 'export'
  });
  return fieldRect;
};
/**
 * Adds smooth transition-like behavior for hover effects to the field group and rectangle.
 */
const createFieldHoverInteraction = ({
  options,
  fieldGroup,
  fieldRect
}) => {
  const {
    mode
  } = options;
  if (mode === 'export' || !options.color) {
    return;
  }
  if (options.fieldCanvasStyle?.backgroundColor) {
    return;
  }
  const hoverColor = getRecipientColorStyles(options.color).baseRingHover;
  fieldGroup.on('mouseover', () => {
    const layer = fieldRect.getLayer();
    if (!layer) {
      return;
    }
    new Konva.Tween({
      node: fieldRect,
      duration: 0.3,
      fill: hoverColor
    }).play();
  });
  fieldGroup.on('mouseout', () => {
    const layer = fieldRect.getLayer();
    if (!layer) {
      return;
    }
    new Konva.Tween({
      node: fieldRect,
      duration: 0.3,
      fill: DEFAULT_RECT_BACKGROUND
    }).play();
  });
  fieldGroup.on('transformstart', () => {
    const layer = fieldRect.getLayer();
    if (!layer) {
      return;
    }
    new Konva.Tween({
      node: fieldRect,
      duration: 0.3,
      fill: hoverColor
    }).play();
  });
  fieldGroup.on('transformend', () => {
    const layer = fieldRect.getLayer();
    if (!layer) {
      return;
    }
    new Konva.Tween({
      node: fieldRect,
      duration: 0.3,
      fill: DEFAULT_RECT_BACKGROUND
    }).play();
  });
};

export { createFieldHoverInteraction, konvaTextFill, konvaTextFontFamily, upsertFieldGroup, upsertFieldRect };
//# sourceMappingURL=field-generic-items.js.map
