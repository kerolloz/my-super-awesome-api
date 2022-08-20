import Joi from 'joi';
import { MongooseQueryParser, QueryOptions } from 'mongoose-query-parser';

export interface IPaginationOptions {
  page: number;
  limit: number;
}

interface IQueryPagination {
  filter: Record<string, unknown>;
  pagination: IPaginationOptions & Omit<QueryOptions, 'limit' | 'filter'>;
}

export abstract class QueryParser {
  static DEFAULTS = { page: 1, limit: 20 };
  static MAX = { limit: 50 };
  static VALIDATIONS = {
    pagination: Joi.object({
      page: Joi.number().positive(),
      limit: Joi.number().positive(),
    }),
    sort: Joi.string(),
  };
  private static parser = new MongooseQueryParser({
    blacklist: ['pagination'],
  });

  private static parsePagination(query: qs.ParsedQs): IPaginationOptions {
    const options = query.pagination as qs.ParsedQs;
    const LIMIT = this.DEFAULTS.limit.toString();
    const PAGE = this.DEFAULTS.page.toString();
    const page = typeof options?.page === 'string' ? options.page : PAGE;
    const limit = typeof options?.limit === 'string' ? options.limit : LIMIT;
    return {
      ...this.DEFAULTS,
      page: parseInt(page) || this.DEFAULTS.page,
      limit: Math.min(parseInt(limit) || this.DEFAULTS.limit, this.MAX.limit),
    };
  }

  static parse(q: qs.ParsedQs): IQueryPagination {
    try {
      const values = this.parser.parse(q);
      // only filter by keys from the validated joiSchema
      const { filter, ...pagination } = {
        ...values,
        ...this.parsePagination(q),
      };
      return { filter, pagination };
    } catch (err) {
      console.error(err);
      return { filter: {}, pagination: this.DEFAULTS };
    }
  }
}
