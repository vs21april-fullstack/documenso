import { DOCUMENSO_ENCRYPTION_KEY } from '../../constants/crypto.js';

const isTwoFactorAuthenticationEnabled = ({
  user
}) => {
  return user.twoFactorEnabled && typeof DOCUMENSO_ENCRYPTION_KEY === 'string';
};

export { isTwoFactorAuthenticationEnabled };
//# sourceMappingURL=is-2fa-availble.js.map
