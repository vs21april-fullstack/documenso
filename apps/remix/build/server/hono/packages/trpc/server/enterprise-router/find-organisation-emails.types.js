import { ZOrganisationEmailManySchema } from '../../../lib/types/organisation-email.js';
import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { z } from 'zod';

const ZFindOrganisationEmailsRequestSchema = ZFindSearchParamsSchema.extend({
  organisationId: z.string(),
  emailDomainId: z.string().optional()
});
const ZFindOrganisationEmailsResponseSchema = ZFindResultResponse.extend({
  data: ZOrganisationEmailManySchema.array()
});

export { ZFindOrganisationEmailsRequestSchema, ZFindOrganisationEmailsResponseSchema };
//# sourceMappingURL=find-organisation-emails.types.js.map
