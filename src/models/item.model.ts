import { Schema, Document } from 'mongoose';


export interface Item extends Document {
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const ItemSchema = new Schema<Item>({
  name: { type: String, required: true },
  description: { type: String, required: true },

}, { timestamps: true, versionKey: false });
