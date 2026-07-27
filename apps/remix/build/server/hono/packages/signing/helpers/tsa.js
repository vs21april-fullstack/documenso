import { NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY } from '../../lib/constants/app.js';
import { HttpTimestampAuthority } from '@libpdf/core';
import { once } from 'remeda';

const setupTimestampAuthorities = once(() => {
  const timestampAuthority = NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY();
  if (!timestampAuthority) {
    return null;
  }
  const timestampAuthorities = timestampAuthority.trim().split(',').filter(Boolean).map(url => {
    return new HttpTimestampAuthority(url);
  });
  return timestampAuthorities;
});
const getTimestampAuthority = () => {
  const authorities = setupTimestampAuthorities();
  if (!authorities) {
    return null;
  }
  // Pick a random authority
  return authorities[Math.floor(Math.random() * authorities.length)];
};

export { getTimestampAuthority };
//# sourceMappingURL=tsa.js.map
