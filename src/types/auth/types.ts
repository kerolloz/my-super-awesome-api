import { DocumentType } from '@typegoose/typegoose';
import { Request } from 'express';
import { User } from '../../models';

export interface IAuthToken {
  id: string;
}

export interface IAuthRequest<T extends User = User> extends Request {
  currentUser: DocumentType<T>;
}
