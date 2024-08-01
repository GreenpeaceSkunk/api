import { Schema } from "mongoose";

const schema = new Schema(
  {
    minAmount: {type: Number},
    gatewayType: { 
      type: String,
      enum: ['tbk', 'mp', 'payu'],
      required: true,
    },
    gatewayToken: { type: String, required: true, unique: true },
    gatewayParentToken: { type: String, default: null },
    gatewayUsername: { type: String },
    gatewayPayerId: { type: String },
    gatewayAuthorizationCode: { type: Number },
    gatewayResponseCode: { type: Number },
    paymentType: {
      type: String,
      enum: ['credit_card', 'debit_card', 'bank_account'],
    },
    paymentCardType: { type: String },
    paymentCardNumber: { type: String },
    paymentIsCardHolder: { type: Boolean, default: null },
    paymentHolderName: { type: String },
    paymentDocType: { type: String },
    paymentDocNumber: { type: String },
    status: { 
      type: [{type: String}],
      default: [],
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },{});

export { schema };
