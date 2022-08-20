import { NextFunction, Request, Response } from 'express';
import { IAuthRequest, IAuthToken } from '../auth';
import { HttpException, UNAUTHORIZED } from '../core';
import { JsonWebToken } from '../lib/JsonWebToken';
import { UserModel } from '../models';

export async function authenticate(
  req: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.token;

  if (!token) {
    return next(
      new HttpException(UNAUTHORIZED, { message: 'a token is needed' }),
    );
  }
  const decoded_token = JsonWebToken.decode(token) as IAuthToken;
  if (decoded_token) {
    const user = await UserModel.findById(decoded_token.id);
    if (user && JsonWebToken.verify(token, user.password)) {
      (req as IAuthRequest).currentUser = user;
      return next();
    }
  }

  return next(new HttpException(UNAUTHORIZED, { message: 'invalid token' }));
}
