import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { EmailDomainStatusSchema } from '../../../prisma/generated/zod/inputTypeSchemas/EmailDomainStatusSchema.js';
import { EmailDomainSchema } from '../../../prisma/generated/zod/modelSchema/EmailDomainSchema.js';
import { OrganisationSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationSchema.js';
import { z } from 'zod';

const ZFindEmailDomainsRequestSchema = ZFindSearchParamsSchema.extend({
  status: EmailDomainStatusSchema.optional()
});
const ZFindEmailDomainsResponseSchema = ZFindResultResponse.extend({
  data: EmailDomainSchema.pick({
    id: true,
    domain: true,
    status: true,
    selector: true,
    createdAt: true,
    updatedAt: true,
    lastVerifiedAt: true
  }).extend({
    organisation: OrganisationSchema.pick({
      id: true,
      name: true,
      url: true
    }),
    _count: z.object({
      emails: z.number()
    })
  }).array()
});

export { ZFindEmailDomainsRequestSchema, ZFindEmailDomainsResponseSchema };
//# sourceMappingURL=find-email-domains.types.js.map
