import { APP_DOCUMENT_UPLOAD_SIZE_LIMIT } from '../../lib/constants/app.js';
import { BRANDING_LOGO_MAX_SIZE_BYTES, BRANDING_LOGO_MAX_SIZE_MB, BRANDING_LOGO_ALLOWED_TYPES } from '../../lib/constants/branding.js';
import { megabytesToBytes } from '../../lib/universal/unit-convertions.js';
import z from 'zod';
import { zfd } from 'zod-form-data';

/**
 * A `zfd.file()` schema with a max file size constraint based on
 * `APP_DOCUMENT_UPLOAD_SIZE_LIMIT`. Use this instead of bare `zfd.file()`
 * to ensure server-side file size validation.
 */
const zfdFile = () => {
  const maxBytes = megabytesToBytes(APP_DOCUMENT_UPLOAD_SIZE_LIMIT);
  return zfd.file().refine(file => file.size <= maxBytes, {
    message: `File cannot be larger than ${APP_DOCUMENT_UPLOAD_SIZE_LIMIT}MB`
  });
};
/**
 * A `zfd.file()` schema constrained to branding-logo images: size-limited and
 * restricted to a MIME allowlist. Use for server-side branding logo uploads.
 */
const zfdBrandingImageFile = () => {
  return zfd.file().refine(file => file.size <= BRANDING_LOGO_MAX_SIZE_BYTES, {
    message: `File cannot be larger than ${BRANDING_LOGO_MAX_SIZE_MB}MB`
  }).refine(file => BRANDING_LOGO_ALLOWED_TYPES.includes(file.type), {
    message: 'File must be a JPG, PNG, or WebP image'
  });
};
/**
 * This helper takes the place of the `z.object` at the root of your schema.
 * It wraps your schema in a `z.preprocess` that extracts all the data out of a `FormData`
 * and transforms it into a regular object.
 * If the `FormData` contains multiple entries with the same field name,
 * it will automatically turn that field into an array.
 *
 * This is used instead of `zfd.formData()` because it receives `undefined`
 * somewhere in the pipeline of our openapi schema generation and throws
 * an error. This provides the same functionality as `zfd.formData()` but
 * can be considered somewhat safer.
 */
const zodFormData = schema => {
  return z.preprocess(data => {
    if (data instanceof FormData) {
      const formData = {};
      for (const key of data.keys()) {
        const values = data.getAll(key);
        formData[key] = values.length > 1 ? values : values[0];
      }
      return formData;
    }
    return data;
  }, z.object(schema));
};

export { zfdBrandingImageFile, zfdFile, zodFormData };
//# sourceMappingURL=zod-form-data.js.map
