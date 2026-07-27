import { sendOrganisationAccountLinkConfirmationEmail } from '../../../../ee/server-only/lib/send-organisation-account-link-confirmation-email.js';
import { isSignupEnabledForProvider, isDisposableEmail } from '../../../../lib/constants/auth.js';
import { AppError } from '../../../../lib/errors/app-error.js';
import { getEmailBlocklistDomains } from '../../../../lib/server-only/site-settings/get-email-blocklist-domains.js';
import { onCreateUserHook } from '../../../../lib/server-only/user/create-user.js';
import { formatOrganisationLoginUrl } from '../../../../lib/utils/organisation-authentication-portal.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { AuthenticationErrorCode } from '../errors/error-codes.js';
import { onAuthorize } from './authorizer.js';
import { validateOauth } from './handle-oauth-callback-url.js';
import { getOrganisationAuthenticationPortalOptions } from './organisation-portal.js';

const handleOAuthOrganisationCallbackUrl = async options => {
  const {
    c,
    orgUrl
  } = options;
  const {
    organisation,
    clientOptions
  } = await getOrganisationAuthenticationPortalOptions({
    type: 'url',
    organisationUrl: orgUrl
  });
  const {
    email,
    name,
    sub,
    accessToken,
    accessTokenExpiresAt,
    idToken
  } = await validateOauth({
    c,
    clientOptions: {
      ...clientOptions,
      bypassEmailVerification: true // Bypass for organisation OIDC because we manually verify the email.
    }
  });
  const allowedDomains = organisation.organisationAuthenticationPortal.allowedDomains;
  if (allowedDomains.length > 0 && !allowedDomains.some(domain => email.endsWith(`@${domain}`))) {
    throw new AppError(AuthenticationErrorCode.InvalidRequest, {
      message: 'Email domain not allowed'
    });
  }
  // Find the account if possible.
  const existingAccount = await prismaWithReplicas.account.findFirst({
    where: {
      provider: clientOptions.id,
      providerAccountId: sub
    },
    include: {
      user: true
    }
  });
  // Directly log in user if account already exists.
  if (existingAccount) {
    await onAuthorize({
      userId: existingAccount.user.id
    }, c);
    return c.redirect(`/o/${orgUrl}`, 302);
  }
  let userToLink = await prismaWithReplicas.user.findFirst({
    where: {
      email
    }
  });
  // Handle new user.
  if (!userToLink) {
    if (!isSignupEnabledForProvider('oidc')) {
      const errorUrl = new URL(formatOrganisationLoginUrl(orgUrl));
      errorUrl.searchParams.set('error', AuthenticationErrorCode.SignupDisabled);
      return c.redirect(errorUrl.toString(), 302);
    }
    // Reject disposable / throwaway email providers for new SSO users.
    const additionalBlockedDomains = await getEmailBlocklistDomains();
    if (isDisposableEmail(email, additionalBlockedDomains)) {
      const errorUrl = new URL(formatOrganisationLoginUrl(orgUrl));
      errorUrl.searchParams.set('error', AuthenticationErrorCode.SignupDisposableEmail);
      return c.redirect(errorUrl.toString(), 302);
    }
    userToLink = await prismaWithReplicas.user.create({
      data: {
        email: email,
        name: name,
        emailVerified: null // Do not verify email.
      }
    });
    await onCreateUserHook(userToLink, {
      skipPersonalOrganisation: !organisation.organisationAuthenticationPortal.allowPersonalOrganisations
    }).catch(err => {
      // Todo: (RR7) Add logging.
      console.error(err);
    });
  }
  await sendOrganisationAccountLinkConfirmationEmail({
    type: userToLink.emailVerified ? 'link' : 'create',
    userId: userToLink.id,
    organisationId: organisation.id,
    organisationName: organisation.name,
    oauthConfig: {
      accessToken,
      idToken,
      providerAccountId: sub,
      expiresAt: Math.floor(accessTokenExpiresAt.getTime() / 1000)
    }
  });
  return c.redirect(`${formatOrganisationLoginUrl(orgUrl)}?action=verification-required`, 302);
};

export { handleOAuthOrganisationCallbackUrl };
//# sourceMappingURL=handle-oauth-organisation-callback-url.js.map
