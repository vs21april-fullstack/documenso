import { Hono } from 'hono';
import { detectFieldsRoute } from './detect-fields.js';
import { detectRecipientsRoute } from './detect-recipients.js';

const aiRoute = new Hono().route('/detect-recipients', detectRecipientsRoute).route('/detect-fields', detectFieldsRoute);

export { aiRoute };
//# sourceMappingURL=route.js.map
