import { pre, prop } from '@typegoose/typegoose';
import { Password } from '../../lib';
import { Constructor } from '../../types';

export interface IHasPassword {
  _password: string;
  password: string;
  /**
   * returns true on correct password, false otherwise.
   * @param password password in plain text
   */
  authenticate: (password: string) => Promise<boolean>;
}

export function HasPassword<TBase extends Constructor>(Base: TBase) {
  @pre<_HasPassword>('save', async function () {
    if (this.isModified('_password')) {
      this._password = await Password.hash(this._password);
    }
  })
  abstract class _HasPassword extends Base implements IHasPassword {
    @prop({
      required: true,
      alias: 'password',
      minlength: [
        8,
        'Your `password` must consist of at least 8 characters (got {MINLENGTH})',
      ],
    })
    _password!: string;
    password!: string; // just for TypeScript, not stored in DB

    authenticate(password: string) {
      return Password.isCorrectPassword(password, this._password);
    }
  }

  return _HasPassword;
}
