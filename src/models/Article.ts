import { getModelForClass, prop } from '@typegoose/typegoose';
import Joi from 'joi';
import PaginatedModel from './PaginatedModel';

export class Article extends PaginatedModel {
  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  content!: string;
}

export const ArticleModel = getModelForClass(Article);

export const articleValidations = {
  title: Joi.string().required(),
  content: Joi.string().required(),
};
