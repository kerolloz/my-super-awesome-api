import { getModelForClass, prop } from '@typegoose/typegoose';
import BaseModel from './BaseModel';
import {
  CanGenerateToken,
  HasPassword,
  ICanGenerateToken,
  IHasPassword,
} from './mixins';

@HasPassword
@CanGenerateToken
export class User extends BaseModel {
  @prop({ required: true, unique: true })
  email!: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface User extends IHasPassword, ICanGenerateToken {}

export const UserModel = getModelForClass(User, {
  options: { customName: 'users' },
});
