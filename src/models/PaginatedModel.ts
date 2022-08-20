import { plugin } from '@typegoose/typegoose';
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { QueryParser } from '../lib';
import BaseModel from './BaseModel';

@plugin(mongoosePaginate)
export default class PaginatedModel extends BaseModel {
  static paginate: <T extends PaginatedModel>(
    this: T,
    query?: FilterQuery<T>,
    options?: PaginateOptions,
    callback?: (err: Error, result: PaginateResult<T>) => void,
  ) => Promise<PaginateResult<T>>;

  static search<T extends PaginatedModel>(
    this: T,
    query: qs.ParsedQs,
    customQuery: Record<string, unknown> = {},
  ): Promise<PaginateResult<T>> {
    const q = QueryParser.parse(query);
    const finalQuery = { ...q.filter, ...customQuery };
    return (this as any).paginate(finalQuery, q.pagination);
  }
}
