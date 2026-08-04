import { resolveWebappUrl } from './url.js';

const formatOrganisationLoginUrl = (organisationUrl) => {
  return resolveWebappUrl(formatOrganisationLoginPath(organisationUrl));
};
const formatOrganisationLoginPath = (organisationUrl) => {
  return `/o/${organisationUrl}/signin`;
};
const formatOrganisationCallbackUrl = (organisationUrl) => {
  return resolveWebappUrl(`/api/auth/callback/oidc/org/${organisationUrl}`);
};

export { formatOrganisationCallbackUrl, formatOrganisationLoginPath, formatOrganisationLoginUrl };
//# sourceMappingURL=organisation-authentication-portal.js.map
