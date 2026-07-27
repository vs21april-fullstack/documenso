import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import crypto from 'crypto';
import { ONE_HOUR } from '../../constants/time.js';
import { sendForgotPassword } from '../auth/send-forgot-password.js';

const forgotPassword = async ({
  email
}) => {
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      email: {
        equals: email
      }
    }
  });
  if (!user) {
    return;
  }
  const token = crypto.randomBytes(18).toString('hex');
  // Invalidate any prior reset tokens for this user before issuing a new one, so
  // only a single token is ever live at a time. We still always issue a fresh
  // token (and email) so the user can request a new link if a prior email never
  // arrived, while bounding the number of usable tokens to one.
  await prismaWithReplicas.$transaction(async tx => {
    await tx.passwordResetToken.deleteMany({
      where: {
        userId: user.id
      }
    });
    await tx.passwordResetToken.create({
      data: {
        token,
        expiry: new Date(Date.now() + ONE_HOUR),
        userId: user.id
      }
    });
  });
  await sendForgotPassword({
    userId: user.id
  }).catch(err => console.error(err));
};

export { forgotPassword };
//# sourceMappingURL=forgot-password.js.map
