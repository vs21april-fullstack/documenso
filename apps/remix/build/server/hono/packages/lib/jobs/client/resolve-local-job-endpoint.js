const resolveLocalJobEndpoint = ({ internalWebAppUrl, publicWebAppUrl, jobDefinitionId, jobId }) => {
  const internalUrl = new URL(internalWebAppUrl);
  const publicUrl = new URL(publicWebAppUrl);
  // Reverse proxies can mount the application below a base path while exposing
  // another service at the origin root. If the internal URL points at that same
  // origin without a path, preserve the public application's mount path so jobs
  // are posted back to the application instead of the unrelated root service.
  if (internalUrl.origin === publicUrl.origin && internalUrl.pathname === '/' && publicUrl.pathname !== '/') {
    internalUrl.pathname = publicUrl.pathname;
  }
  const basePath = internalUrl.pathname.replace(/\/$/, '');
  internalUrl.pathname = `${basePath}/api/jobs/${encodeURIComponent(jobDefinitionId)}/${encodeURIComponent(jobId)}`;
  internalUrl.search = '';
  internalUrl.hash = '';
  return internalUrl.toString();
};

export { resolveLocalJobEndpoint };
//# sourceMappingURL=resolve-local-job-endpoint.js.map
