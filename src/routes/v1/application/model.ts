import { model } from "mongoose";
import { schema } from "./schema";

interface IModel {
  app_name: string;
} 

export const Model = model<IModel>('Application', schema);
