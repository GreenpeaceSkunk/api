import {IDonationDocument} from 'greenpeace';
import {model} from "mongoose";
import {schema} from "../../schemas/log/schema";

const Model = model<any>('Log', schema);
export {Model}
