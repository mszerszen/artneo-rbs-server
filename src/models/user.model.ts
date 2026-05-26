import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  login: string;
  password: string;
  role: 'user' | 'admin';
  email: string;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  email: { type: String, required: true }
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);