// eslint-disable-next-line @typescript-eslint/require-await
const handleRedirects = async c => {
  const {
    req
  } = c;
  const path = req.path;
  // Direct rewrites
  if (path === '/documents' || path === '/documents/folders' || path === '/templates' || path === '/templates/folders') {
    return '/';
  }
  return null;
};

export { handleRedirects };
//# sourceMappingURL=redirects.js.map
