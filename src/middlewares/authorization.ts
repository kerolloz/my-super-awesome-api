import { NextFunction, Request, Response } from 'express';
import { IAuthRequest } from '../auth';
import { FORBIDDEN, HttpException } from '../core';
import { Constructor } from '../types';

export function authorize(...types: Constructor[]) {
  return (req: Request, _: Response, next: NextFunction) => {
    const { currentUser } = req as IAuthRequest;

    // -- your logic here --
    // if (types.find((t) => t.name === currentUser.type)) {
    //   return next();
    // }

    return next(
      new HttpException(FORBIDDEN, { message: 'you are not allowed' }),
    );
  };
}
