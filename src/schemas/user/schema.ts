import { Schema } from "mongoose";

const schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  docType: { 
    type: String,
    enum: ['CC', 'CE', 'PP', 'TI', 'RC', 'NIT', 'RUT', 'DNI', 'CI', 'LC', 'LE'],
  },
  docNumber: { type: String },
  areaCode: { type: String },
  phoneNumber: { type: String },
  birthDate: { type: Date }, // 
  country: { type: String },
  region: { type: String },
  province: { type: String },
  city: { type: String },
  address: { type: String },
  addressNumber: { type: Number },
  email: {
    type: String,
    required: true,
    // unique: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    lowercase: true,
  },
  status: { 
    type: [{type: String}],
    default: [],
  },
});

export { schema };
