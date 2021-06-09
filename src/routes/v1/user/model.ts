import {model} from 'mongoose';
import {schema} from './schema';
import {IUserDocument} from 'greenpeace';

export const Model = model<IUserDocument>('user', schema);
