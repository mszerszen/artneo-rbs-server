import { Schema, model, Document } from 'mongoose';

export interface IEquipment extends Document {
  name: string;
  type: 'projector' | 'laptop' | 'monitor' | 'camera' | 'adapter' | 'other';
  description: string;
  isAvailable: boolean;
}

const equipmentSchema = new Schema<IEquipment>({
  name: { type: String, required: true },
  type: { 
    type: String,
    required: true,
    enum: ['projector', 'laptop', 'monitor', 'camera', 'adapter', 'other']
  },
  description: { type: String, required: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export const Equipment = model<IEquipment>('Equipment', equipmentSchema);