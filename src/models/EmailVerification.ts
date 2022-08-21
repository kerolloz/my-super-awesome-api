import { getModelForClass, post, prop, Ref } from '@typegoose/typegoose';
import { randomUUID } from 'crypto';
import { VerificationMailer } from '../mailer';
import BaseModel from './BaseModel';
import { ExpiresAfter } from './mixins';
import { User, UserModel } from './User';

@post('save', function (this: EmailVerification) {
  new VerificationMailer(this.user as User, this.code).sendEmail();
})
@ExpiresAfter(30 * 60) // 30 minutes
export class EmailVerification extends BaseModel {
  @prop({ required: true, unique: true, default: randomUUID })
  code!: string;

  @prop({ required: true, unique: true, ref: () => UserModel.modelName })
  user!: Ref<User>;
}

export const EmailVerificationModel = getModelForClass(EmailVerification, {
  options: { customName: 'verifications' },
});
