import { resolveWebappUrl } from './url';

export const formatOrganisationLoginUrl = (organisationUrl: string) => {
  return resolveWebappUrl(formatOrganisationLoginPath(organisationUrl));
};

export const formatOrganisationLoginPath = (organisationUrl: string) => {
  return `/o/${organisationUrl}/signin`;
};

export const formatOrganisationCallbackUrl = (organisationUrl: string) => {
  return resolveWebappUrl(`/api/auth/callback/oidc/org/${organisationUrl}`);
};
