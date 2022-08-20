import { endpoint } from '../../core';
import { UserModel, userSignupValidations } from '../../models';

export default endpoint({ body: userSignupValidations }, async (req) => {
  await UserModel.create(req.body);
  return 'Registred successfully. A verification mail has been sent to your email address.';
});
