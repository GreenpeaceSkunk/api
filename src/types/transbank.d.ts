import {Document} from 'mongoose';
import {ObjectID} from 'mongodb';
import {IDonation, IUser} from './shared'

export type CreateInscriptionBodyType = {
  rut: string;
  email: string;
  responseUrl: string;
}

export type CreateInscriptionResponseType = {
  token: string;
  url_webpay: string;
}

export type FinishBodyInscriptionType = {
  token: string;
}

export type FinishInscriptionResponseType = {
  response_code: string;
  transbank_user: string;
  authorization_code: string;
  card_type: string;
  card_number: string;
}

interface ITransbankTransaction extends IDonation {
  // userDoc: ITransbankUserDocument;
  // donationType: string;
  // paymentType: 'credit_card' | 'debit_card' | 'bank_account';
  // cardType: string;
  // amount: number;
  // isCardHolder: boolean;
  // paymentHolderName: string;
  // paymentDocType: string;
  // paymentDocNumber: string;
  // cardNumber: string;
  tbkToken: string;
  tbkUsername: string;
  tbkUser: string;
  responseCode: number;
  authorizationCode: number;
  // salesforceScheduleId: string;
  // salesforcePaymentInstrumentId: string;
  // salesforceOpportunityId: string;
  // salesforceCommitmentId: string;
  // salesforcePersonAccountId: string;
  // status: string;
}

interface ITransbankUser extends IUser {};

export interface ITransbankUserDocument extends ITransbankUser, Document {};
export interface ITransbankTransactionDocument extends ITransbankTransaction, Document {};
