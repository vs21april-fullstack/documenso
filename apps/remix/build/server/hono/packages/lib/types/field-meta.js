import { FieldType } from '@prisma/client';
import { z } from 'zod';
import { DEFAULT_SIGNATURE_TEXT_FONT_SIZE } from '../constants/pdf.js';

const FIELD_DEFAULT_GENERIC_VERTICAL_ALIGN = 'middle';
const FIELD_DEFAULT_GENERIC_ALIGN = 'left';
const FIELD_DEFAULT_LINE_HEIGHT = 1;
const FIELD_DEFAULT_LETTER_SPACING = 0;
const FIELD_MIN_LINE_HEIGHT = 1;
const FIELD_MAX_LINE_HEIGHT = 10;
const FIELD_MIN_LETTER_SPACING = 0;
const FIELD_MAX_LETTER_SPACING = 100;
const DEFAULT_FIELD_FONT_SIZE = 12;
const DEFAULT_SIGNATURE_OVERFLOW_MODE = 'auto';
const DEFAULT_DATE_OVERFLOW_MODE = 'auto';
const DEFAULT_EMAIL_OVERFLOW_MODE = 'auto';
/**
 * The overflow mode for a field.
 *
 * - 'auto': Will overflow horizontally if no room to wrap vertically.
 * - 'horizontal': Overflow horizontally, will not wrap at all.
 * - 'vertical': Overflow vertically, will wrap at the field width.
 * - 'crop': Crop the text to the field bounds, will not overflow at all.
 *
 * @default 'crop'
 */
const ZFieldOverflowMode = z.enum(['auto', 'horizontal', 'vertical', 'crop']);
/**
 * Resolves the overflow mode for a field.
 *
 * Returns 'crop' when undefined (the default for most fields).
 */
const resolveFieldOverflowMode = fieldMeta => {
  return fieldMeta?.overflow ?? 'crop';
};
const ZFieldMetaLineHeight = z.coerce.number().min(FIELD_MIN_LINE_HEIGHT).max(FIELD_MAX_LINE_HEIGHT).describe('The line height of the text');
const ZFieldMetaLetterSpacing = z.coerce.number().min(FIELD_MIN_LETTER_SPACING).max(FIELD_MAX_LETTER_SPACING).describe('The spacing between each character');
const ZFieldMetaVerticalAlign = z.enum(['top', 'middle', 'bottom']).describe('The vertical alignment of the text');
const ZBaseFieldMeta = z.object({
  label: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  readOnly: z.boolean().optional(),
  fontSize: z.number().min(8).max(96).default(DEFAULT_FIELD_FONT_SIZE).optional(),
  overflow: ZFieldOverflowMode.optional()
});
const ZFieldTextAlignSchema = z.enum(['left', 'center', 'right']);
const ZInitialsFieldMeta = ZBaseFieldMeta.extend({
  type: z.literal('initials'),
  textAlign: ZFieldTextAlignSchema.optional()
});
const ZNameFieldMeta = ZBaseFieldMeta.extend({
  type: z.literal('name'),
  textAlign: ZFieldTextAlignSchema.optional()
});
const ZEmailFieldMeta = ZBaseFieldMeta.extend({
  type: z.literal('email'),
  textAlign: ZFieldTextAlignSchema.optional(),
  overflow: ZFieldOverflowMode.optional().default(DEFAULT_EMAIL_OVERFLOW_MODE)
});
const ZDateFieldMeta = ZBaseFieldMeta.extend({
  type: z.literal('date'),
  textAlign: ZFieldTextAlignSchema.optional(),
  overflow: ZFieldOverflowMode.optional().default(DEFAULT_DATE_OVERFLOW_MODE)
});
const ZTextFieldMeta = ZBaseFieldMeta.extend({
  type: z.literal('text'),
  text: z.string().optional(),
  characterLimit: z.coerce.number({
    invalid_type_error: 'Value must be a number'
  }).min(0).optional(),
  textAlign: ZFieldTextAlignSchema.optional(),
  lineHeight: ZFieldMetaLineHeight.nullish(),
  letterSpacing: ZFieldMetaLetterSpacing.nullish(),
  verticalAlign: ZFieldMetaVerticalAlign.nullish()
});
const ZNumberFieldMeta = ZBaseFieldMeta.extend({
  type: z.literal('number'),
  numberFormat: z.string().nullish(),
  value: z.string().optional(),
  minValue: z.coerce.number().nullish(),
  maxValue: z.coerce.number().nullish(),
  textAlign: ZFieldTextAlignSchema.optional(),
  lineHeight: ZFieldMetaLineHeight.nullish(),
  letterSpacing: ZFieldMetaLetterSpacing.nullish(),
  verticalAlign: ZFieldMetaVerticalAlign.nullish()
});
const ZRadioFieldMeta = ZBaseFieldMeta.extend({
  type: z.literal('radio'),
  values: z.array(z.object({
    id: z.number(),
    checked: z.boolean(),
    value: z.string()
  })).optional(),
  direction: z.enum(['vertical', 'horizontal']).optional().default('vertical')
});
const ZCheckboxFieldMeta = ZBaseFieldMeta.extend({
  type: z.literal('checkbox'),
  values: z.array(z.object({
    id: z.number(),
    checked: z.boolean(),
    value: z.string()
  })).optional(),
  validationRule: z.string().optional(),
  validationLength: z.number().optional(),
  direction: z.enum(['vertical', 'horizontal']).optional().default('vertical')
});
const ZDropdownFieldMeta = ZBaseFieldMeta.extend({
  type: z.literal('dropdown'),
  values: z.array(z.object({
    value: z.string()
  })).optional(),
  defaultValue: z.string().optional()
});
const ZSignatureFieldMeta = ZBaseFieldMeta.extend({
  type: z.literal('signature'),
  overflow: ZFieldOverflowMode.optional().default(DEFAULT_SIGNATURE_OVERFLOW_MODE)
});
const ZFieldMetaNotOptionalSchema = z.discriminatedUnion('type', [ZSignatureFieldMeta, ZInitialsFieldMeta, ZNameFieldMeta, ZEmailFieldMeta, ZDateFieldMeta, ZTextFieldMeta, ZNumberFieldMeta, ZRadioFieldMeta, ZCheckboxFieldMeta, ZDropdownFieldMeta]);
const ZFieldMetaPrefillFieldsSchema = z.object({
  id: z.number()
}).and(z.discriminatedUnion('type', [z.object({
  type: z.literal('text'),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  value: z.string().optional()
}), z.object({
  type: z.literal('number'),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  value: z.string().optional()
}), z.object({
  type: z.literal('radio'),
  label: z.string().optional(),
  value: z.string().optional()
}), z.object({
  type: z.literal('checkbox'),
  label: z.string().optional(),
  value: z.array(z.string()).optional()
}), z.object({
  type: z.literal('dropdown'),
  label: z.string().optional(),
  value: z.string().optional()
}), z.object({
  type: z.literal('date'),
  value: z.string().optional()
})]));
const ZFieldMetaSchema = z.union([
// Handles an empty object being provided as fieldMeta.
z.object({}).strict().transform(() => undefined), ZFieldMetaNotOptionalSchema]).optional();
const ZFieldAndMetaSchema = z.discriminatedUnion('type', [z.object({
  type: z.literal(FieldType.SIGNATURE),
  fieldMeta: ZSignatureFieldMeta.optional()
}), z.object({
  type: z.literal(FieldType.FREE_SIGNATURE),
  fieldMeta: z.undefined()
}), z.object({
  type: z.literal(FieldType.INITIALS),
  fieldMeta: ZInitialsFieldMeta.optional()
}), z.object({
  type: z.literal(FieldType.NAME),
  fieldMeta: ZNameFieldMeta.optional()
}), z.object({
  type: z.literal(FieldType.EMAIL),
  fieldMeta: ZEmailFieldMeta.optional()
}), z.object({
  type: z.literal(FieldType.DATE),
  fieldMeta: ZDateFieldMeta.optional()
}), z.object({
  type: z.literal(FieldType.TEXT),
  fieldMeta: ZTextFieldMeta.optional()
}), z.object({
  type: z.literal(FieldType.NUMBER),
  fieldMeta: ZNumberFieldMeta.optional()
}), z.object({
  type: z.literal(FieldType.RADIO),
  fieldMeta: ZRadioFieldMeta.optional()
}), z.object({
  type: z.literal(FieldType.CHECKBOX),
  fieldMeta: ZCheckboxFieldMeta.optional()
}), z.object({
  type: z.literal(FieldType.DROPDOWN),
  fieldMeta: ZDropdownFieldMeta.optional()
})]);
const FIELD_DATE_META_DEFAULT_VALUES = {
  type: 'date',
  fontSize: DEFAULT_FIELD_FONT_SIZE,
  textAlign: 'left',
  overflow: DEFAULT_DATE_OVERFLOW_MODE
};
const FIELD_TEXT_META_DEFAULT_VALUES = {
  type: 'text',
  fontSize: DEFAULT_FIELD_FONT_SIZE,
  textAlign: 'left',
  label: '',
  placeholder: '',
  text: '',
  required: false,
  readOnly: false
};
const FIELD_NUMBER_META_DEFAULT_VALUES = {
  type: 'number',
  fontSize: DEFAULT_FIELD_FONT_SIZE,
  textAlign: 'left',
  label: '',
  placeholder: '',
  required: false,
  readOnly: false
};
const FIELD_INITIALS_META_DEFAULT_VALUES = {
  type: 'initials',
  fontSize: DEFAULT_FIELD_FONT_SIZE,
  textAlign: 'left'
};
const FIELD_NAME_META_DEFAULT_VALUES = {
  type: 'name',
  fontSize: DEFAULT_FIELD_FONT_SIZE,
  textAlign: 'left'
};
const FIELD_EMAIL_META_DEFAULT_VALUES = {
  type: 'email',
  fontSize: DEFAULT_FIELD_FONT_SIZE,
  textAlign: 'left',
  overflow: DEFAULT_EMAIL_OVERFLOW_MODE
};
const FIELD_RADIO_META_DEFAULT_VALUES = {
  type: 'radio',
  fontSize: DEFAULT_FIELD_FONT_SIZE,
  values: [{
    id: 1,
    checked: false,
    value: ''
  }],
  required: false,
  readOnly: false,
  direction: 'vertical'
};
const FIELD_CHECKBOX_META_DEFAULT_VALUES = {
  type: 'checkbox',
  fontSize: DEFAULT_FIELD_FONT_SIZE,
  values: [{
    id: 1,
    checked: false,
    value: ''
  }],
  validationRule: '',
  validationLength: 0,
  required: false,
  readOnly: false,
  direction: 'vertical'
};
const FIELD_DROPDOWN_META_DEFAULT_VALUES = {
  type: 'dropdown',
  fontSize: DEFAULT_FIELD_FONT_SIZE,
  values: [{
    value: 'Option 1'
  }],
  defaultValue: '',
  required: false,
  readOnly: false
};
const FIELD_SIGNATURE_META_DEFAULT_VALUES = {
  type: 'signature',
  fontSize: DEFAULT_SIGNATURE_TEXT_FONT_SIZE,
  overflow: DEFAULT_SIGNATURE_OVERFLOW_MODE
};
const FIELD_META_DEFAULT_VALUES = {
  [FieldType.SIGNATURE]: FIELD_SIGNATURE_META_DEFAULT_VALUES,
  [FieldType.FREE_SIGNATURE]: undefined,
  [FieldType.INITIALS]: FIELD_INITIALS_META_DEFAULT_VALUES,
  [FieldType.NAME]: FIELD_NAME_META_DEFAULT_VALUES,
  [FieldType.EMAIL]: FIELD_EMAIL_META_DEFAULT_VALUES,
  [FieldType.DATE]: FIELD_DATE_META_DEFAULT_VALUES,
  [FieldType.TEXT]: FIELD_TEXT_META_DEFAULT_VALUES,
  [FieldType.NUMBER]: FIELD_NUMBER_META_DEFAULT_VALUES,
  [FieldType.RADIO]: FIELD_RADIO_META_DEFAULT_VALUES,
  [FieldType.CHECKBOX]: FIELD_CHECKBOX_META_DEFAULT_VALUES,
  [FieldType.DROPDOWN]: FIELD_DROPDOWN_META_DEFAULT_VALUES
};
const ZEnvelopeFieldAndMetaSchema = z.discriminatedUnion('type', [z.object({
  type: z.literal(FieldType.SIGNATURE),
  fieldMeta: ZSignatureFieldMeta.optional().default(FIELD_SIGNATURE_META_DEFAULT_VALUES)
}), z.object({
  type: z.literal(FieldType.FREE_SIGNATURE),
  fieldMeta: z.undefined()
}), z.object({
  type: z.literal(FieldType.INITIALS),
  fieldMeta: ZInitialsFieldMeta.optional().default(FIELD_INITIALS_META_DEFAULT_VALUES)
}), z.object({
  type: z.literal(FieldType.NAME),
  fieldMeta: ZNameFieldMeta.optional().default(FIELD_NAME_META_DEFAULT_VALUES)
}), z.object({
  type: z.literal(FieldType.EMAIL),
  fieldMeta: ZEmailFieldMeta.optional().default(FIELD_EMAIL_META_DEFAULT_VALUES)
}), z.object({
  type: z.literal(FieldType.DATE),
  fieldMeta: ZDateFieldMeta.optional().default(FIELD_DATE_META_DEFAULT_VALUES)
}), z.object({
  type: z.literal(FieldType.TEXT),
  fieldMeta: ZTextFieldMeta.optional().default(FIELD_TEXT_META_DEFAULT_VALUES)
}), z.object({
  type: z.literal(FieldType.NUMBER),
  fieldMeta: ZNumberFieldMeta.optional().default(FIELD_NUMBER_META_DEFAULT_VALUES)
}), z.object({
  type: z.literal(FieldType.RADIO),
  fieldMeta: ZRadioFieldMeta.optional().default(FIELD_RADIO_META_DEFAULT_VALUES)
}), z.object({
  type: z.literal(FieldType.CHECKBOX),
  fieldMeta: ZCheckboxFieldMeta.optional().default(FIELD_CHECKBOX_META_DEFAULT_VALUES)
}), z.object({
  type: z.literal(FieldType.DROPDOWN),
  fieldMeta: ZDropdownFieldMeta.optional().default(FIELD_DROPDOWN_META_DEFAULT_VALUES)
})]);

export { DEFAULT_DATE_OVERFLOW_MODE, DEFAULT_EMAIL_OVERFLOW_MODE, DEFAULT_FIELD_FONT_SIZE, DEFAULT_SIGNATURE_OVERFLOW_MODE, FIELD_CHECKBOX_META_DEFAULT_VALUES, FIELD_DATE_META_DEFAULT_VALUES, FIELD_DEFAULT_GENERIC_ALIGN, FIELD_DEFAULT_GENERIC_VERTICAL_ALIGN, FIELD_DEFAULT_LETTER_SPACING, FIELD_DEFAULT_LINE_HEIGHT, FIELD_DROPDOWN_META_DEFAULT_VALUES, FIELD_EMAIL_META_DEFAULT_VALUES, FIELD_INITIALS_META_DEFAULT_VALUES, FIELD_MAX_LETTER_SPACING, FIELD_MAX_LINE_HEIGHT, FIELD_META_DEFAULT_VALUES, FIELD_MIN_LETTER_SPACING, FIELD_MIN_LINE_HEIGHT, FIELD_NAME_META_DEFAULT_VALUES, FIELD_NUMBER_META_DEFAULT_VALUES, FIELD_RADIO_META_DEFAULT_VALUES, FIELD_SIGNATURE_META_DEFAULT_VALUES, FIELD_TEXT_META_DEFAULT_VALUES, ZBaseFieldMeta, ZCheckboxFieldMeta, ZDateFieldMeta, ZDropdownFieldMeta, ZEmailFieldMeta, ZEnvelopeFieldAndMetaSchema, ZFieldAndMetaSchema, ZFieldMetaNotOptionalSchema, ZFieldMetaPrefillFieldsSchema, ZFieldMetaSchema, ZFieldOverflowMode, ZFieldTextAlignSchema, ZInitialsFieldMeta, ZNameFieldMeta, ZNumberFieldMeta, ZRadioFieldMeta, ZSignatureFieldMeta, ZTextFieldMeta, resolveFieldOverflowMode };
//# sourceMappingURL=field-meta.js.map
