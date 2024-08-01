import { Schema } from "mongoose";

const schema = new Schema(
  {
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
    authorizationCode: { type: Number },
    responseCode: { type: Number },
    tbkToken: { type: String, required: true, unique: true },
    tbkUsername: { type: String },
    tbkUser: { type: String }, // payerId
  },
  {
    versionKey: false, // TODO: Review if it works
  });

export { schema };
