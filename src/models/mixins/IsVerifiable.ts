import { prop } from '@typegoose/typegoose';
import type { Constructor } from '../../types/index.js';

export interface IIsVerifiable {
  _isVerified: boolean;
}

export function IsVerifiable<TBase extends Constructor>(Base: TBase) {
  abstract class _IsVerifiable extends Base implements IIsVerifiable {
    @prop({ default: false })
    _isVerified!: boolean;
  }

  return _IsVerifiable;
}
