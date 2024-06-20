import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import {
  emailAPIKeyEnvVar,
  emailFromAddressEnvVar,
  emailFromNameEnvVar,
} from '../config';

const mailerSend = new MailerSend({ apiKey: emailAPIKeyEnvVar });
const sentFrom = new Sender(emailFromAddressEnvVar, emailFromNameEnvVar);

export abstract class BaseMailer {
  protected abstract get msg(): {
    to: { email: string; name: string };
    subject: string;
    html: string;
  };

  public sendEmail() {
    if (!this.msg) {
      throw new Error('Email not set');
    }

    const recipients = [new Recipient(this.msg.to.email, this.msg.to.name)];
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(this.msg.subject)
      .setHtml(this.msg.html);

    mailerSend.email
      .send(emailParams)
      .then(() =>
        console.log(`An email was sent to ${JSON.stringify(this.msg.to)}`),
      )
      .catch(console.error);
  }
}
