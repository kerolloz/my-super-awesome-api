import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import Joi from 'joi';
import PaginatedModel from './PaginatedModel';
import { User, UserModel } from './User';

export class Article extends PaginatedModel {
  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  content!: string;

  @prop({ required: true, ref: () => UserModel.modelName })
  user!: Ref<User>;
}

export const ArticleModel = getModelForClass(Article);

export const articleValidations = {
  title: Joi.string().required(),
  content: Joi.string().required(),
};
