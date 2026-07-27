import { DocumentVisibility, TeamMemberRole, OrganisationGroupType } from '@prisma/client';

const LOWEST_TEAM_ROLE = TeamMemberRole.MEMBER;
const ALLOWED_TEAM_GROUP_TYPES = [OrganisationGroupType.CUSTOM, OrganisationGroupType.INTERNAL_ORGANISATION];
const TEAM_INTERNAL_GROUPS = [{
  teamRole: TeamMemberRole.ADMIN,
  type: OrganisationGroupType.INTERNAL_TEAM
}, {
  teamRole: TeamMemberRole.MANAGER,
  type: OrganisationGroupType.INTERNAL_TEAM
}, {
  teamRole: TeamMemberRole.MEMBER,
  type: OrganisationGroupType.INTERNAL_TEAM
}];
const TEAM_MEMBER_ROLE_PERMISSIONS_MAP = {
  DELETE_TEAM: [TeamMemberRole.ADMIN],
  MANAGE_TEAM: [TeamMemberRole.ADMIN, TeamMemberRole.MANAGER]
};
const TEAM_DOCUMENT_VISIBILITY_MAP = {
  [TeamMemberRole.ADMIN]: [DocumentVisibility.ADMIN, DocumentVisibility.MANAGER_AND_ABOVE, DocumentVisibility.EVERYONE],
  [TeamMemberRole.MANAGER]: [DocumentVisibility.MANAGER_AND_ABOVE, DocumentVisibility.EVERYONE],
  [TeamMemberRole.MEMBER]: [DocumentVisibility.EVERYONE]
};
/**
 * A hierarchy of team member roles to determine which role has higher permission than another.
 *
 * Warning: The length of the array is used to determine the priority of the role.
 * See `getHighestTeamRoleInGroup`
 */
const TEAM_MEMBER_ROLE_HIERARCHY = {
  [TeamMemberRole.ADMIN]: [TeamMemberRole.ADMIN, TeamMemberRole.MANAGER, TeamMemberRole.MEMBER],
  [TeamMemberRole.MANAGER]: [TeamMemberRole.MANAGER, TeamMemberRole.MEMBER],
  [TeamMemberRole.MEMBER]: [TeamMemberRole.MEMBER]
};
const PROTECTED_TEAM_URLS = ['403', '404', '500', '502', '503', '504', 'about', 'account', 'admin', 'administrator', 'api', 'app', 'archive', 'auth', 'backup', 'config', 'configure', 'contact', 'contact-us', 'copyright', 'crime', 'criminal', 'dashboard', 'docs', 'documenso', 'documentation', 'document', 'documents', 'error', 'exploit', 'exploitation', 'exploiter', 'feedback', 'finance', 'forgot-password', 'fraud', 'fraudulent', 'hack', 'hacker', 'harassment', 'help', 'helpdesk', 'illegal', 'internal', 'legal', 'login', 'logout', 'maintenance', 'malware', 'newsletter', 'policy', 'privacy', 'profile', 'public', 'reset-password', 'scam', 'scammer', 'settings', 'setup', 'sign', 'signin', 'signout', 'signup', 'spam', 'support', 'system', 'team', 'terms', 'virus', 'webhook'];

export { ALLOWED_TEAM_GROUP_TYPES, LOWEST_TEAM_ROLE, PROTECTED_TEAM_URLS, TEAM_DOCUMENT_VISIBILITY_MAP, TEAM_INTERNAL_GROUPS, TEAM_MEMBER_ROLE_HIERARCHY, TEAM_MEMBER_ROLE_PERMISSIONS_MAP };
//# sourceMappingURL=teams.js.map
