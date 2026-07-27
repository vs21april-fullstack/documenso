/**
 * Converts a fields percentage based values to pixel based values.
 */
const calculateFieldPosition = (field, pageWidth, pageHeight) => {
  const fieldWidth = pageWidth * (Number(field.width) / 100);
  const fieldHeight = pageHeight * (Number(field.height) / 100);
  const fieldX = pageWidth * (Number(field.positionX) / 100);
  const fieldY = pageHeight * (Number(field.positionY) / 100);
  return {
    fieldX,
    fieldY,
    fieldWidth,
    fieldHeight
  };
};
/**
 * Calculate the position of a field item such as Checkbox, Radio.
 */
const calculateMultiItemPosition = options => {
  const {
    fieldWidth,
    fieldHeight,
    itemCount,
    itemIndex,
    itemSize,
    spacingBetweenItemAndText,
    fieldPadding,
    direction,
    type
  } = options;
  const innerFieldHeight = fieldHeight - fieldPadding * 2;
  const innerFieldWidth = fieldWidth - fieldPadding; // This is purposefully not using fullPadding to allow flush text.
  const innerFieldX = fieldPadding;
  const innerFieldY = fieldPadding;
  if (direction === 'horizontal') {
    const itemHeight = innerFieldHeight;
    const itemWidth = innerFieldWidth / itemCount;
    const y = innerFieldY;
    const x = itemIndex * itemWidth + innerFieldX;
    let itemInputY = y + itemHeight / 2 - itemSize / 2;
    let itemInputX = x;
    // We need a little different logic to center the radio circle icon.
    if (type === 'radio') {
      itemInputX = x + itemSize / 2;
      itemInputY = y + itemHeight / 2;
    }
    const textX = x + itemSize + spacingBetweenItemAndText;
    const textY = y;
    // Multiplied by 2 for extra padding on the right hand side of the text and the next item.
    const textWidth = itemWidth - itemSize - spacingBetweenItemAndText * 2;
    const textHeight = itemHeight;
    return {
      itemInputX,
      itemInputY,
      textX,
      textY,
      textWidth,
      textHeight
    };
  }
  const itemHeight = innerFieldHeight / itemCount;
  const y = itemIndex * itemHeight + innerFieldY;
  let itemInputY = y + itemHeight / 2 - itemSize / 2;
  let itemInputX = innerFieldX;
  // We need a little different logic to center the radio circle icon.
  if (type === 'radio') {
    itemInputX = innerFieldX + itemSize / 2;
    itemInputY = y + itemHeight / 2;
  }
  const textX = innerFieldX + itemSize + spacingBetweenItemAndText;
  const textY = y;
  const textWidth = innerFieldWidth - itemSize - spacingBetweenItemAndText;
  const textHeight = itemHeight;
  return {
    itemInputX,
    itemInputY,
    textX,
    textY,
    textWidth,
    textHeight
  };
};

export { calculateFieldPosition, calculateMultiItemPosition };
//# sourceMappingURL=field-renderer.js.map
