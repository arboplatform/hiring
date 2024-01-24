import { Schema } from 'mongoose';

const BaseSchema = new Schema(
  {
    status: {
      type: String,
      default: 'ativo',
      enum: ['ativo', 'inativo'],
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
