import { ZEmailDomainManySchema } from '../../../lib/types/email-domain.js';
import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { EmailDomainStatus } from '@prisma/client';
import { z } from 'zod';

const ZFindOrganisationEmailDomainsRequestSchema = ZFindSearchParamsSchema.extend({
  organisationId: z.string(),
  emailDomainId: z.string().optional(),
  statuses: z.nativeEnum(EmailDomainStatus).array().optional()
});
const ZFindOrganisationEmailDomainsResponseSchema = ZFindResultResponse.extend({
  data: z.array(ZEmailDomainManySchema.extend({
    emailCount: z.number()
  }))
});

export { ZFindOrganisationEmailDomainsRequestSchema, ZFindOrganisationEmailDomainsResponseSchema };
//# sourceMappingURL=find-organisation-email-domain.types.js.map
