import { getModelForClass, prop } from '@typegoose/typegoose';
import BaseModel from './BaseModel';
import {
  HasPassword,
  type IHasPassword,
  type IIsVerifiable,
  IsVerifiable,
} from './mixins';

@HasPassword
@IsVerifiable
// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: This is a Typegoose feature
export class User extends BaseModel {
  @prop({ required: true, unique: true, trim: true, lowercase: true })
  email!: string;

  @prop({ required: true, trim: true })
  name!: string;
}

export interface User extends IHasPassword, IIsVerifiable {}

export const UserModel = getModelForClass(User, {
  options: { customName: 'users' },
});
