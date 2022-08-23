import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { URL_REGEX } from '../regex/url';
import PaginatedModel from './PaginatedModel';
import { User, UserModel } from './User';

export class Article extends PaginatedModel {
  @prop({ required: true, trim: true, minlength: 3 })
  title!: string;

  @prop({ required: true, trim: true, minlength: 3 })
  content!: string;

  @prop({ required: true, autopopulate: true, ref: () => UserModel.modelName })
  user!: Ref<User>;

  @prop({ match: URL_REGEX })
  image!: string;
}

export const ArticleModel = getModelForClass(Article);
