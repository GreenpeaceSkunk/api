import mongoose, { model, ObjectId } from "mongoose";
import { schema } from "./schema";

export interface ISalesforceSession {
  _id: ObjectId;
  accessToken: string;
  signature: string;
  instanceUrl: string;
  salesforceId: string;
  tokenType: string;
  issuedAt: Date;
  expireAt: Date;
}

export const Model = model<ISalesforceSession>('SalesforceSession', schema);
