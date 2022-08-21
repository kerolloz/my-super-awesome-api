import { endpoint } from '../../core';
import {
  EmailVerificationModel,
  UserModel,
  userSignupValidations,
} from '../../models';

export default endpoint({ body: userSignupValidations }, async (req) => {
  const user = await UserModel.create(req.body);
  await EmailVerificationModel.create({ user });
  return 'Registred successfully. A verification mail has been sent to your email address.';
});
