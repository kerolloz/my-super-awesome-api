import { randomUUID } from 'node:crypto';
import {
  type DocumentType,
  getModelForClass,
  post,
  prop,
} from '@typegoose/typegoose';
import { VerificationMailer } from '../mailer';
import BaseModel from './BaseModel';
import { type User, UserModel } from './User';
import { ExpiresAfter } from './mixins';

@post('save', function (this: EmailVerification) {
  new VerificationMailer(this.user as User, this.code).sendEmail();
})
@ExpiresAfter(30 * 60) // 30 minutes
export class EmailVerification extends BaseModel {
  @prop({ required: true, unique: true, default: randomUUID })
  code!: string;

  @prop({
    required: true,
    unique: true,
    autopopulate: true,
    ref: () => UserModel.modelName,
  })
  user!: DocumentType<User>;
}

export const EmailVerificationModel = getModelForClass(EmailVerification, {
  options: { customName: 'verifications' },
});
