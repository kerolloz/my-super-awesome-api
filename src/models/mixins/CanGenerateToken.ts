import { ObjectId } from 'bson';
import { JsonWebToken } from '../../lib';
import { Constructor } from '../../types';

export interface ICanGenerateToken {
  /**
   * generate a token with the document id as the payload
   */
  generateToken(): string;
}

export function CanGenerateToken<TBase extends Constructor>(Base: TBase) {
  abstract class _CanGenerateToken extends Base implements ICanGenerateToken {
    id!: ObjectId;
    password!: string;

    generateToken(): string {
      return JsonWebToken.encode({ id: this.id.toString() }, this.password);
    }
  }

  return _CanGenerateToken;
}
