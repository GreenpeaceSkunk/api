import {ObjectID} from 'mongodb';
import {
  IUserDocument,
  IDonationDocument,
  ITransactionDocument,
} from './shared';
import {
  InscriptionFinishBodyType,
  InscriptionFinishResponseType,
} from './transbank';

export interface IRequestError {
  statusText?: string;
  status: number;
  message?: string;
  errorMessage: string;
}

export type DomainType = 'ar' | 'cl' | 'co';

export type {
  InscriptionFinishBodyType,
  InscriptionFinishResponseType,
  // ITransbankUserDocument,
  // ITransbankTransactionDocument,
  IUserDocument,
  IDonationDocument,
  ITransactionDocument,
}
