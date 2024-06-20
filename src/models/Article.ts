import { type Ref, getModelForClass, prop } from '@typegoose/typegoose';
import BaseModel from './BaseModel';
import { type User, UserModel } from './User';

const URL_REGEX = /^(http:\/\/|https:\/\/).+/;

export class Article extends BaseModel {
  @prop({ required: true, trim: true, minlength: 3 })
  title!: string;

  @prop({ required: true, trim: true, minlength: 3 })
  content!: string;

  @prop({ required: true, ref: () => UserModel.modelName })
  user!: Ref<User>;

  @prop({ match: URL_REGEX })
  image!: string;
}

export const ArticleModel = getModelForClass(Article);
