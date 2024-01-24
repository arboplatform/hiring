import { Schema } from 'mongoose';
import { StatusEnum } from '../enums';

const BaseSchema = new Schema(
  {
    status: {
      type: String,
      default: StatusEnum.Ativo,
      enum: Object.values(StatusEnum),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default BaseSchema;
