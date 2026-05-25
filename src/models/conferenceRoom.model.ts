import { Schema, model, Document } from 'mongoose';

export interface IConferenceRoom extends Document {
  name: string;
  capacity: number;
  isAvailable: boolean;
}

const conferenceRoomSchema = new Schema<IConferenceRoom>({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export const ConferenceRoom = model<IConferenceRoom>('ConferenceRoom', conferenceRoomSchema);