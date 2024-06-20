import { getModelForClass, prop } from '@typegoose/typegoose';
import BaseModel from './BaseModel.js';
import {
  HasPassword,
  type IHasPassword,
  type IIsVerifiable,
  IsVerifiable,
} from './mixins/index.js';

@HasPassword
@IsVerifiable
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class User extends BaseModel {
  @prop({ required: true, unique: true, trim: true, lowercase: true })
  email!: string;

  @prop({ required: true, trim: true })
  name!: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-declaration-merging
export interface User extends IHasPassword, IIsVerifiable {}

export const UserModel = getModelForClass(User, {
  options: { customName: 'users' },
});
