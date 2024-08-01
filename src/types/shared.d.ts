import { Document } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  docType: ['CC' | 'CE' | 'PP' | 'TI' | 'RC' | 'NIT' | 'RUT' | 'DNI' | 'CI' | 'LC' | 'LE'];
  docNumber: string;
  areaCode: string;
  phoneNumber: string;
  birthDate: Date;
  country: string;
  region: string;
  province: string;
  city: string;
  address: string;
  addressNumber: number;
  email: string;
  status: Array<string>; // TODO: Review
}

interface IUserDocument extends IUser, Document {};

interface ITransaction {
  gatewayType: ['tbk' | 'mp' | 'payu'];
  gatewayToken: string;
  gatewayParentToken: string;
  gatewayUsername: string;
  gatewayUser: string; // AKA payerId
  paymentType: ['credit_card' | 'debit_card' | 'bank_account'];
  paymentCardType: string;
  paymentCardNumber: string;
  paymentIsCardHolder: boolean;
  paymentHolderName: string;
  paymentDocType: string;
  paymentDocNumber: string;
  authorizationCode: number;
  responseCode: number;
  status: Array<string>; // TODO: Review
  attemps: number;
  minAmount: number;
}

interface ITransactionDocument extends ITransaction, Document {};

interface IDonation {
  userDoc: IUserDocument;
  txnDoc: ITransactionDocument;
  amount: number;
  donationType: 'regular' | 'oneoff';
  donationStartDate: Date;
  donationEndDate: Date;
  salesforcefScheduleId: string;
  salesforcefPaymentInstrumentId: string;
  salesforcefOpportunityId: string;
  salesforcefCommitmentId: string;
  salesforcefPersonAccountId: string;
  utm_campaign: string;
  utm_medium: string;
  utm_source: string;
  utm_content: string;
  utm_term: string;
  status: Array<string>; // TODO: Review
  createdAt: Date;
}

interface IDonationDocument extends IDonation, Document {};

export type {
  IUserDocument,
  IDonationDocument,
  ITransactionDocument,
};
