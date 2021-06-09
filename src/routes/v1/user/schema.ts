import { Schema } from 'mongoose';
import { IUser, IUserDocument } from 'greenpeace';

const schema = new Schema<IUserDocument>({
  id: {
    type: Schema.Types.ObjectId,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  birthday: {
    type: String,
  },
  userAgent: {
    type: String,
  }
}, {
  timestamps: true,
  strict: true,
});

export { schema };
