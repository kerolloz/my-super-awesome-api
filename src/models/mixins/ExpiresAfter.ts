import { index, prop } from '@typegoose/typegoose';
import { Constructor } from '../../types';

export interface ICanExpire {
  /**
   *  The expiration date of the document.
   *  The date when the document will be removed from the database.
   */
  expiresAt: Date;
}

/**
 * Adds the expiresAt property to the model
 * and sets the default value to the current date plus the given time.
 * Also adds the expiresAt index to the model as TTL index.
 * @param seconds the number of seconds to expire after
 *
 */
export function ExpiresAfter(seconds: number) {
  return function <TBase extends Constructor>(Base: TBase) {
    @index({ expiresAt: 1 }, { expireAfterSeconds: 1 })
    abstract class _CanExpire extends Base implements ICanExpire {
      @prop({
        required: true,
        default: () => Date.now() + seconds * 1000,
      })
      expiresAt!: Date;
    }

    return _CanExpire;
  };
}
