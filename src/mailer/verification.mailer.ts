import { MailDataRequired } from '@sendgrid/mail';
import { frontendBaseURIEnvVar } from '../config';
import { User } from '../models';
import { BaseMailer } from './base.mailer';

export class VerificationMailer extends BaseMailer {
  private readonly SUBJECT = 'Verify your Email';
  private name: string;
  private verificationToken: string;
  private to: string;

  constructor({ email: to, name }: User, verificationToken: string) {
    super();
    this.to = to;
    this.name = name;
    this.verificationToken = verificationToken;
  }

  get msg(): MailDataRequired {
    return {
      to: this.to,
      from: this.from,
      subject: this.SUBJECT,
      html: this.html,
    };
  }

  get html(): string {
    const { name, verificationToken } = this;
    const verificationLink = `${frontendBaseURIEnvVar}/verify?code=${verificationToken}`;

    return `
    <h1>Welcome!</h1> <br>
    <h3>We are happy to see you, ${name}.</h3>
    <p style="font-size: 16px">
      Please use the following link to <b>verify</b> your email.<br>
      <a href='${verificationLink}' target='_blank'>${verificationLink}</a>
      <br>
      This link will be invalid in 30 minutes.
    </p>
    `;
  }
}
