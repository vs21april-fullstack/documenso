import { NEXT_PUBLIC_WEBAPP_URL } from '../constants/app.js';

const formatOrganisationLoginUrl = organisationUrl => {
  return NEXT_PUBLIC_WEBAPP_URL() + formatOrganisationLoginPath(organisationUrl);
};
const formatOrganisationLoginPath = organisationUrl => {
  return `/o/${organisationUrl}/signin`;
};
const formatOrganisationCallbackUrl = organisationUrl => {
  return `${NEXT_PUBLIC_WEBAPP_URL()}/api/auth/callback/oidc/org/${organisationUrl}`;
};

export { formatOrganisationCallbackUrl, formatOrganisationLoginPath, formatOrganisationLoginUrl };
//# sourceMappingURL=organisation-authentication-portal.js.map
