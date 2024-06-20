import { modelOptions, plugin } from '@typegoose/typegoose';
import type { Func } from '@typegoose/typegoose/lib/types.js';
import mongooseAutoPopulate from 'mongoose-autopopulate';

/**
 * Basic document model with timestamps enabled,
 * id instead of _id,
 * __v field hidden,
 * and all the fields that start with an underscore are hidden.
 */
@plugin(mongooseAutoPopulate as unknown as Func)
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (_, doc) => {
        const id = doc._id as string;
        const privateKeys = Object.keys(doc).filter((key) =>
          key.startsWith('_'),
        );
        privateKeys.forEach((key) => delete doc[key]); // hide private keys

        return { id, ...doc };
      },
    },
  },
})
export default abstract class BaseModel {}
