import { PROTECTED_TEAM_URLS } from '../../../lib/constants/teams.js';
import { ZNameSchema } from '../../../lib/types/name.js';
import { zEmail } from '../../../lib/utils/zod.js';
import { TeamMemberRole } from '@prisma/client';
import { z } from 'zod';

/**
 * Restrict team URLs schema.
 *
 * Allowed characters:
 * - Alphanumeric
 * - Lowercase
 * - Dashes
 * - Underscores
 *
 * Conditions:
 * - 3-30 characters
 * - Cannot start and end with underscores or dashes.
 * - Cannot contain consecutive underscores or dashes.
 * - Cannot be a reserved URL in the PROTECTED_TEAM_URLS list
 */
const ZTeamUrlSchema = z.string().trim().min(3, {
  message: 'Team URL must be at least 3 characters long.'
}).max(30, {
  message: 'Team URL must not exceed 30 characters.'
}).toLowerCase().regex(/^[a-z0-9].*[^_-]$/, 'Team URL cannot start or end with dashes or underscores.').regex(/^(?!.*[-_]{2})/, 'Team URL cannot contain consecutive dashes or underscores.').regex(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/, 'Team URL can only contain letters, numbers, dashes and underscores.').refine(value => !PROTECTED_TEAM_URLS.includes(value), {
  message: 'This URL is already in use.'
});
const ZCreateTeamEmailVerificationMutationSchema = z.object({
  teamId: z.number(),
  name: ZNameSchema,
  email: zEmail().trim().toLowerCase().min(1, 'Please enter a valid email.')
});
const ZDeleteTeamEmailMutationSchema = z.object({
  teamId: z.number()
});
const ZDeleteTeamEmailVerificationMutationSchema = z.object({
  teamId: z.number()
});
z.object({
  teamId: z.number()
});
const ZUpdateTeamEmailMutationSchema = z.object({
  teamId: z.number(),
  data: z.object({
    name: ZNameSchema
  })
});
z.object({
  teamId: z.number(),
  teamMemberId: z.number(),
  data: z.object({
    role: z.nativeEnum(TeamMemberRole)
  })
});
const ZResendTeamEmailVerificationMutationSchema = z.object({
  teamId: z.number()
});

export { ZCreateTeamEmailVerificationMutationSchema, ZDeleteTeamEmailMutationSchema, ZDeleteTeamEmailVerificationMutationSchema, ZResendTeamEmailVerificationMutationSchema, ZTeamUrlSchema, ZUpdateTeamEmailMutationSchema };
//# sourceMappingURL=schema.js.map
