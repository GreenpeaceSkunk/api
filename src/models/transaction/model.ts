// import {ITransbankTransactionDocument} from 'greenpeace';
import { ITransactionDocument } from "greenpeace";
import {model} from "mongoose";
import {schema} from "../../schemas/transaction/schema";

const Model = model<ITransactionDocument>('Transaction', schema);
export {Model}
