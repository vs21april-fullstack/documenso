import './app.js';

const DEFAULT_STANDARD_FONT_SIZE = 12;
const DEFAULT_HANDWRITING_FONT_SIZE = 50;
const DEFAULT_SIGNATURE_TEXT_FONT_SIZE = 18;
const MIN_STANDARD_FONT_SIZE = 8;
const MIN_HANDWRITING_FONT_SIZE = 20;
const SIGNATURE_FONT_FAMILY_CAVEAT = 'Caveat';
// CN-before-JP: the JP Noto file's Han glyphs use JP shapes, so pure-CN
// text would otherwise render with JP forms. Family names sync with
// apps/remix/app/app.css and packages/lib/server-only/pdf/helpers.ts.
const SIGNATURE_FONT_FAMILY_NOTO = '"Noto Sans", "Noto Sans Chinese", "Noto Sans Japanese", "Noto Sans Korean", sans-serif';
const isASCII = str => /^\p{ASCII}*$/u.test(str);
// Deliberately never mix handwriting + sans-serif within one signature.
const getSignatureFontFamily = typedSignatureText => isASCII(typedSignatureText) ? SIGNATURE_FONT_FAMILY_CAVEAT : SIGNATURE_FONT_FAMILY_NOTO;
const PDF_SIZE_A4_72PPI = {
  width: 595,
  height: 842
};

export { DEFAULT_HANDWRITING_FONT_SIZE, DEFAULT_SIGNATURE_TEXT_FONT_SIZE, DEFAULT_STANDARD_FONT_SIZE, MIN_HANDWRITING_FONT_SIZE, MIN_STANDARD_FONT_SIZE, PDF_SIZE_A4_72PPI, getSignatureFontFamily };
//# sourceMappingURL=pdf.js.map
