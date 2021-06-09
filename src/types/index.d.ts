import { Document } from 'mongoose';
import {ObjectID} from 'mongodb';

export interface IRequestError {
  statusText?: string;
  status: number;
  message?: string;
  errorMessage: string;
}

/**
 * User Document
 */
export interface IUser {
  id: string;
  fullName: string;
  email: string;
  birthday: string;
  userAgent?: string;
}
export interface IUserDocument extends IUser, Document {}
