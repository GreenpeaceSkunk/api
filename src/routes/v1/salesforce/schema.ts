import {Schema} from "mongoose";

const schema = new Schema({
  accessToken: { type: String, required: true },
  signature: { type: String, required: true },
  instanceUrl: { type: String, required: true },
  salesforceId: { type: String, required: true },
  tokenType: { type: String, required: true },
  issuedAt: { type: Date, required: true },
  expireAt: { type: Date, required: true },
});

export { schema };
