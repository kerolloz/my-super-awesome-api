import { getModelForClass, prop } from '@typegoose/typegoose';
import Joi from 'joi';
import BaseModel from './BaseModel';
import {
  CanGenerateToken,
  HasPassword,
  ICanGenerateToken,
  IHasPassword,
  IIsVerifiable,
  IsVerifiable,
} from './mixins';

@HasPassword
@IsVerifiable
@CanGenerateToken
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class User extends BaseModel {
  @prop({ required: true, unique: true, trim: true, lowercase: true })
  email!: string;

  @prop({ required: true, trim: true })
  name!: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-declaration-merging
export interface User extends IHasPassword, ICanGenerateToken, IIsVerifiable {}

export const UserModel = getModelForClass(User, {
  options: { customName: 'users' },
});

export const userLoginValidations = {
  email: Joi.string().required(),
  password: Joi.string().required(),
};

export const userSignupValidations = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};
