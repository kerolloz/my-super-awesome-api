import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { URL_REGEX } from '../regex/url';
import BaseModel from './BaseModel';
import { User, UserModel } from './User';

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
