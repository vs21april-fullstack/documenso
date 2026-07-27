import { z } from 'zod';
import { isValidRedirectUrl } from '../utils/is-valid-redirect-url.js';

/**
 * Note this allows empty strings.
 */
const ZUrlSchema = z.string().refine(value => value === undefined || value === '' || isValidRedirectUrl(value), {
  message: 'Please enter a valid URL, make sure you include http:// or https:// part of the url.'
});

export { ZUrlSchema };
//# sourceMappingURL=common.js.map
