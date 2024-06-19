import { frontendBaseURIEnvVar } from '../config';
import { BaseMailer } from './base.mailer';

export class VerificationMailer extends BaseMailer {
  private readonly SUBJECT = 'Verify your Email';

  constructor(
    private user: { email: string; name: string },
    private verificationToken: string,
  ) {
    super();
  }

  get msg() {
    return {
      to: { email: this.user.email, name: this.user.name },
      subject: this.SUBJECT,
      html: this.html,
    };
  }

  get html(): string {
    const { user, verificationToken } = this;
    const verificationLink = `${frontendBaseURIEnvVar}/verify?code=${verificationToken}`;

    return `
    <h1>Welcome!</h1> <br>
    <h3>We are happy to see you, ${user.name}.</h3>
    <p style="font-size: 16px">
      Please use the following link to <b>verify</b> your email.<br>
      <a href='${verificationLink}' target='_blank'>${verificationLink}</a>
      <br>
      This link will be invalid in 30 minutes.
    </p>
    `;
  }
}
