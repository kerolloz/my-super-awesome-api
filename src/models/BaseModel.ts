import { DocumentType, modelOptions, plugin } from '@typegoose/typegoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import mongooseIdValidator from 'mongoose-id-validator2';

/**
 * Basic document model with timestamps enabled,
 * id instead of _id,
 * __v field hidden,
 * and all the fields that start with an underscore are hidden.
 */
@plugin(mongooseIdValidator)
@plugin(mongooseAutoPopulate)
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (_, doc: DocumentType<Record<string, unknown>>) => {
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
