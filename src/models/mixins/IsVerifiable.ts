import { prop } from '@typegoose/typegoose';
import { Constructor } from '../../types';

export interface IIsVerifiable {
  isVerified: boolean;
  _isVerified: boolean;
}

export function IsVerifiable<TBase extends Constructor>(Base: TBase) {
  abstract class _IsVerifiable extends Base implements IIsVerifiable {
    @prop({ default: false, alias: 'isVerified' })
    _isVerified!: boolean;
    isVerified!: boolean;
  }

  return _IsVerifiable;
}
