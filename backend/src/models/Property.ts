import mongoose from 'mongoose';
import BaseSchema from './BaseSchema';
import { BaseInterface } from './BaseInterface';

export interface IProperty extends BaseInterface, Document {
  title: string;
  description: string;
  price: number;
  area: number;
  type: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  features: string[];
  img: string[];
}

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  area: Number,
  type: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  features: [String],
  img: [String],
});

propertySchema.add(BaseSchema);

const Property = mongoose.model<IProperty>(
  'Property',
  propertySchema,
  'tb_propertys',
);

export default Property;
