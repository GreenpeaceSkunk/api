import {IUserDocument} from 'greenpeace';
import {model} from "mongoose";
import { schema } from "../../schemas/user/schema";

const Model = model<IUserDocument>('User', schema);
export {Model}
