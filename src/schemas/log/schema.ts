import { Schema } from "mongoose";

const schema = new Schema({
  refDoc: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  status: {
    type: String,
    enum: [
      'CREATE_TRANSACTION_DATABASE',
      'CREATED_TRANSACTION_DATABASE',
      'CREATE_DONATION_DATABASE',
      'CREATED_DONATION_DATABASE',
    ],
  }
});

export { schema };
