import { Schema, model, Document } from 'mongoose';

export interface IOfficeDesk extends Document {
  deskNumber: string;
  operatingSystem: 'windows' | 'macos' | 'linux';
  isAvailable: boolean;
}

const officeDeskSchema = new Schema<IOfficeDesk>({
  deskNumber: { type: String, required: true, unique: true },
  operatingSystem: { 
    type: String,
    required: true,
    enum: ['windows', 'macos', 'linux']
  },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export const OfficeDesk = model<IOfficeDesk>('OfficeDesk', officeDeskSchema);