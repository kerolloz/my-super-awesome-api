import { endpoint, HttpException, UNAUTHORIZED } from '../../core';
import { User, userLoginValidations, UserModel } from '../../models';

export default endpoint({ body: userLoginValidations }, async (req) => {
  const { email, password } = req.body as User;
  const user = await UserModel.findOne({ email });

  if (user && (await user.authenticate(password))) {
    if (!user._isVerified) {
      throw new HttpException(UNAUTHORIZED, {
        message: 'Please verify your email address first.',
      });
    }
    const token = user.generateToken();
    return { content: { user, token } };
  }

  throw new HttpException(UNAUTHORIZED, {
    message: 'Invalid email or password.',
  });
});
