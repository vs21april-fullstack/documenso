import { TeamMemberRole } from '../../prisma/generated/types.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../constants/app.js';
import { TEAM_MEMBER_ROLE_HIERARCHY, LOWEST_TEAM_ROLE, TEAM_DOCUMENT_VISIBILITY_MAP } from '../constants/teams.js';

/**
 * Workaround for E2E tests to not import `msg`.
 */
var DocumentSignatureType;
(function (DocumentSignatureType) {
  DocumentSignatureType["DRAW"] = "draw";
  DocumentSignatureType["TYPE"] = "type";
  DocumentSignatureType["UPLOAD"] = "upload";
})(DocumentSignatureType || (DocumentSignatureType = {}));
const formatTeamUrl = (teamUrl, baseUrl) => {
  const formattedBaseUrl = (baseUrl ?? NEXT_PUBLIC_WEBAPP_URL()).replace(/https?:\/\//, '');
  return `${formattedBaseUrl}/t/${teamUrl}`;
};
const formatDocumentsPath = teamUrl => {
  return `/t/${teamUrl}/documents`;
};
const formatTemplatesPath = teamUrl => {
  return `/t/${teamUrl}/templates`;
};
/**
 * Determines whether a team role can access the visibility of a document.
 *
 * @param action The action the user is trying to execute.
 * @param role The current role of the user.
 * @returns Whether the user can execute the action.
 */
const canAccessTeamDocument = (role, visibility) => {
  return TEAM_DOCUMENT_VISIBILITY_MAP[role].some(i => i === visibility);
};
/**
 * Compares the provided `currentUserRole` with the provided `roleToCheck` to determine
 * whether the `currentUserRole` has permission to modify the `roleToCheck`.
 *
 * @param currentUserRole Role of the current user
 * @param roleToCheck Role of another user to see if the current user can modify
 * @returns True if the current user can modify the other user, false otherwise
 */
const isTeamRoleWithinUserHierarchy = (currentUserRole, roleToCheck) => {
  return TEAM_MEMBER_ROLE_HIERARCHY[currentUserRole].some(i => i === roleToCheck);
};
const getHighestTeamRoleInGroup = groups => {
  let highestTeamRole = LOWEST_TEAM_ROLE;
  groups.forEach(group => {
    const currentRolePriority = TEAM_MEMBER_ROLE_HIERARCHY[group.teamRole].length;
    const highestTeamRolePriority = TEAM_MEMBER_ROLE_HIERARCHY[highestTeamRole].length;
    if (currentRolePriority > highestTeamRolePriority) {
      highestTeamRole = group.teamRole;
    }
  });
  return highestTeamRole;
};
const buildTeamWhereQuery = ({
  teamId,
  userId,
  roles
}) => {
  // Note: Not using inline ternary since typesafety breaks for some reason.
  if (!roles) {
    return {
      id: teamId,
      teamGroups: {
        some: {
          organisationGroup: {
            organisationGroupMembers: {
              some: {
                organisationMember: {
                  userId
                }
              }
            }
          }
        }
      }
    };
  }
  return {
    id: teamId,
    teamGroups: {
      some: {
        organisationGroup: {
          organisationGroupMembers: {
            some: {
              organisationMember: {
                userId
              }
            }
          }
        },
        teamRole: {
          in: roles
        }
      }
    }
  };
};
/**
 * Majority of these are null which lets us inherit from the organisation settings.
 */
const generateDefaultTeamSettings = () => {
  return {
    documentVisibility: null,
    documentLanguage: null,
    documentTimezone: null,
    documentDateFormat: null,
    delegateDocumentOwnership: null,
    includeSenderDetails: null,
    includeSigningCertificate: null,
    includeAuditLog: null,
    typedSignatureEnabled: null,
    uploadSignatureEnabled: null,
    drawSignatureEnabled: null,
    brandingEnabled: null,
    brandingLogo: null,
    brandingUrl: null,
    brandingCompanyDetails: null,
    brandingColors: null,
    brandingCss: null,
    emailDocumentSettings: null,
    emailId: null,
    emailReplyTo: null,
    // emailReplyToName: null,
    defaultRecipients: null,
    envelopeExpirationPeriod: null,
    reminderSettings: null,
    aiFeaturesEnabled: null
  };
};
/**
 * Derive the final settings for a team.
 *
 * @param organisationSettings The organisation settings to inherit values from
 * @param teamSettings The team settings which can override the organisation settings
 */
const extractDerivedTeamSettings = (organisationSettings, teamSettings) => {
  const derivedSettings = {
    ...organisationSettings
  };
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  for (const key of Object.keys(derivedSettings)) {
    const teamValue = teamSettings[key];
    if (teamValue !== null) {
      // @ts-expect-error Should work
      derivedSettings[key] = teamValue;
    }
  }
  return derivedSettings;
};
const isMemberManagerOrAbove = role => {
  return role === TeamMemberRole.ADMIN || role === TeamMemberRole.MANAGER;
};

export { DocumentSignatureType, buildTeamWhereQuery, canAccessTeamDocument, extractDerivedTeamSettings, formatDocumentsPath, formatTeamUrl, formatTemplatesPath, generateDefaultTeamSettings, getHighestTeamRoleInGroup, isMemberManagerOrAbove, isTeamRoleWithinUserHierarchy };
//# sourceMappingURL=teams.js.map
