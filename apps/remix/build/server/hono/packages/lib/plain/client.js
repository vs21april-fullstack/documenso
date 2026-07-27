import { env } from '../utils/env.js';
import { PlainClient } from '@team-plain/typescript-sdk';

const plainClient = new PlainClient({
  apiKey: env('NEXT_PRIVATE_PLAIN_API_KEY') ?? ''
});

export { plainClient };
//# sourceMappingURL=client.js.map
