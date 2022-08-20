import { DocumentType } from '@typegoose/typegoose';
import { Request } from 'express';
import { Account } from '../models/Account';

export interface IAuthToken {
  id: string;
}

export interface IAuthRequest<T extends Account = Account> extends Request {
  currentUser: DocumentType<T>;
}
