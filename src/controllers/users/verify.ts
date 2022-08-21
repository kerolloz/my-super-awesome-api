import Joi from 'joi';
import { endpoint, HttpException, UNAUTHORIZED } from '../../core';
import { EmailVerificationModel } from '../../models';

export default endpoint(
  { body: { code: Joi.string().required() } },
  async (req) => {
    const { code } = req.body as { code: string };
    const verification = await EmailVerificationModel.findOne({ code });

    if (!verification || !verification.user) {
      throw new HttpException(UNAUTHORIZED, {
        message: 'Invalid verification code.',
      });
    }

    verification.user.set({ isVerified: true });
    await verification.user.save();
    await verification.remove();

    return 'Email verified successfully.';
  },
);
