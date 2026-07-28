import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';

const resolveWebAppRedirect = (redirectUrl: string) => {
  const webAppUrl = new URL(NEXT_PUBLIC_WEBAPP_URL());
  const basePath = webAppUrl.pathname.replace(/\/$/, '');

  if (redirectUrl.startsWith('/')) {
    webAppUrl.pathname = `${basePath}${redirectUrl}`;
    webAppUrl.search = '';
    webAppUrl.hash = '';

    return webAppUrl.toString();
  }

  const url = new URL(redirectUrl, `${webAppUrl.toString().replace(/\/$/, '')}/`);
  const isWithinWebApp =
    url.origin === webAppUrl.origin && (url.pathname === basePath || url.pathname.startsWith(`${basePath}/`));

  return isWithinWebApp ? url.toString() : webAppUrl.toString();
};

/**
 * Handle an optional redirect path.
 */
export const handleRequestRedirect = (redirectUrl?: string) => {
  if (!redirectUrl) {
    return;
  }

  window.location.href = resolveWebAppRedirect(redirectUrl);
};

export const handleSignInRedirect = (redirectUrl: string = '/') => {
  window.location.href = resolveWebAppRedirect(redirectUrl);
};
