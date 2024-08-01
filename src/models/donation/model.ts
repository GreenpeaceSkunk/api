import {IDonationDocument} from 'greenpeace';
import {model} from "mongoose";
import {schema} from "../../schemas/donation/schema";

const Model = model<IDonationDocument>('Donation', schema);
export {Model}
