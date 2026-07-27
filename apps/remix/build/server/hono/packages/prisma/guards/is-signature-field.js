import { FieldType } from '@prisma/client';

[FieldType.SIGNATURE, FieldType.FREE_SIGNATURE];
const isSignatureFieldType = type => {
  return type === FieldType.SIGNATURE || type === FieldType.FREE_SIGNATURE;
};

export { isSignatureFieldType };
//# sourceMappingURL=is-signature-field.js.map
