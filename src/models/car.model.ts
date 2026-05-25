import { Schema, model, Document } from 'mongoose';

export interface ICar extends Document {
  name: string;
  registration: string;
  capacity: number;
  transmission: 'manual' | 'automatic';
  isAvailable: boolean;
}

const carSchema = new Schema<ICar>({
  name: { type: String, required: true },
  registration: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  transmission: {
    type: String,
    required: true,
    enum: ['manual', 'automatic']
  },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export const Car = model<ICar>('Car', carSchema);