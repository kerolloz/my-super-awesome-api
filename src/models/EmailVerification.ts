import { getModelForClass, prop } from '@typegoose/typegoose';
import { randomUUID } from 'crypto';
import BaseModel from './BaseModel';
import { ExpiresAfter } from './mixins';

@ExpiresAfter(30 * 60) // 30 minutes
export class EmailVerification extends BaseModel {
  @prop({ required: true, unique: true, default: randomUUID })
  code!: string;

  @prop({ required: true, unique: true })
  email!: string;
}

export const EmailVerificationModel = getModelForClass(EmailVerification);
