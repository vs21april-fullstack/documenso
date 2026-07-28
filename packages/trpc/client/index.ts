import { getBaseUrl } from '@documenso/lib/universal/get-base-url';
import { createTRPCClient, httpLink } from '@trpc/client';

import type { AppRouter } from '../server/router';
import { dataTransformer } from '../utils/data-transformer';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      methodOverride: 'POST',
      transformer: dataTransformer,
      headers: (opts) => {
        if (typeof opts.op.context.teamId === 'string') {
          return {
            'x-team-id': opts.op.context.teamId,
          };
        }

        return {};
      },
    }),
  ],
});
