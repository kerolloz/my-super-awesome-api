import Joi from 'joi';
import { endpoint, HttpException, UNAUTHORIZED } from '../../core';
import { UserModel } from '../../models';
import {
  EmailVerification,
  EmailVerificationModel,
} from '../../models/EmailVerification';

export default endpoint(
  { body: { code: Joi.string().required() } },
  async (req) => {
    const { code } = req.body as EmailVerification;
    const verification = await EmailVerificationModel.findOne({ code });
    if (!verification) {
      throw new HttpException(UNAUTHORIZED, {
        message: 'Invalid verification code.',
      });
    }
    const user = await UserModel.findById(verification.user);
    if (!user) {
      throw new HttpException(UNAUTHORIZED, {
        message: 'Invalid verification code.',
      });
    }
    user.isVerified = true;
    await user.save();
    await verification.remove();
    return 'Email verified successfully.';
  },
);
