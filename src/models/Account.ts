import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import BaseModel from './BaseModel';
import {
  HasPassword,
  CanGenerateToken,
  IHasPassword,
  ICanGenerateToken,
} from './mixins';

@HasPassword
@CanGenerateToken
@modelOptions({ schemaOptions: { discriminatorKey: 'type' } })
export class Account extends BaseModel {
  @prop({ required: true, unique: true })
  email!: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Account extends IHasPassword, ICanGenerateToken {}

export const AccountModel = getModelForClass(Account, {
  options: { customName: 'accounts' },
});
