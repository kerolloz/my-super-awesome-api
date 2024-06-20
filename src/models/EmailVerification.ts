import {
  type DocumentType,
  getModelForClass,
  post,
  prop,
} from '@typegoose/typegoose';
import { randomUUID } from 'node:crypto';
import { VerificationMailer } from '../mailer/index.js';
import BaseModel from './BaseModel.js';
import { ExpiresAfter } from './mixins/index.js';
import { type User, UserModel } from './User.js';

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
