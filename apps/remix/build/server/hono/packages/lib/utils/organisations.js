import { DocumentVisibility } from '@prisma/client';
import { DEFAULT_DOCUMENT_DATE_FORMAT } from '../constants/date-formats.js';
import { DEFAULT_ENVELOPE_EXPIRATION_PERIOD } from '../constants/envelope-expiration.js';
import { DEFAULT_ENVELOPE_REMINDER_SETTINGS } from '../constants/envelope-reminder.js';
import { ORGANISATION_MEMBER_ROLE_HIERARCHY, LOWEST_ORGANISATION_ROLE } from '../constants/organisations.js';
import { DEFAULT_DOCUMENT_EMAIL_SETTINGS } from '../types/document-email.js';

/**
 * Compares the provided `currentUserRole` with the provided `roleToCheck` to determine
 * whether the `currentUserRole` has permission to modify the `roleToCheck`.
 *
 * @param currentUserRole Role of the current user
 * @param roleToCheck Role of another user to see if the current user can modify
 * @returns True if the current user can modify the other user, false otherwise
 */
const isOrganisationRoleWithinUserHierarchy = (currentUserRole, roleToCheck) => {
  return ORGANISATION_MEMBER_ROLE_HIERARCHY[currentUserRole].some(i => i === roleToCheck);
};
const getHighestOrganisationRoleInGroup = groups => {
  let highestOrganisationRole = LOWEST_ORGANISATION_ROLE;
  groups.forEach(group => {
    const currentRolePriority = ORGANISATION_MEMBER_ROLE_HIERARCHY[group.organisationRole].length;
    const highestOrganisationRolePriority = ORGANISATION_MEMBER_ROLE_HIERARCHY[highestOrganisationRole].length;
    if (currentRolePriority > highestOrganisationRolePriority) {
      highestOrganisationRole = group.organisationRole;
    }
  });
  return highestOrganisationRole;
};
const buildOrganisationWhereQuery = ({
  organisationId,
  userId,
  roles
}) => {
  // Note: Not using inline ternary since typesafety breaks for some reason.
  if (!roles) {
    return {
      id: organisationId,
      members: {
        some: {
          userId
        }
      }
    };
  }
  return {
    id: organisationId,
    members: {
      some: {
        userId,
        organisationGroupMembers: {
          some: {
            group: {
              organisationRole: {
                in: roles
              }
            }
          }
        }
      }
    }
  };
};
const generateDefaultOrganisationSettings = () => {
  return {
    documentVisibility: DocumentVisibility.EVERYONE,
    documentLanguage: 'en',
    documentTimezone: null,
    // Null means local timezone.
    documentDateFormat: DEFAULT_DOCUMENT_DATE_FORMAT,
    delegateDocumentOwnership: false,
    includeSenderDetails: true,
    includeSigningCertificate: true,
    includeAuditLog: false,
    typedSignatureEnabled: true,
    uploadSignatureEnabled: true,
    drawSignatureEnabled: true,
    brandingEnabled: false,
    brandingLogo: '',
    brandingUrl: '',
    brandingCompanyDetails: '',
    brandingColors: null,
    brandingCss: '',
    emailId: null,
    emailReplyTo: null,
    // emailReplyToName: null,
    emailDocumentSettings: DEFAULT_DOCUMENT_EMAIL_SETTINGS,
    defaultRecipients: null,
    envelopeExpirationPeriod: DEFAULT_ENVELOPE_EXPIRATION_PERIOD,
    reminderSettings: DEFAULT_ENVELOPE_REMINDER_SETTINGS,
    aiFeaturesEnabled: false
  };
};

export { buildOrganisationWhereQuery, generateDefaultOrganisationSettings, getHighestOrganisationRoleInGroup, isOrganisationRoleWithinUserHierarchy };
//# sourceMappingURL=organisations.js.map
