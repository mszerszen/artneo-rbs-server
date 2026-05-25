import { Schema, model, Document, Types } from 'mongoose';

export interface IReservation extends Document {
  resourceType: 'ConferenceRoom' | 'Car' | 'OfficeDesk' | 'Equipment';
  resourceId: Types.ObjectId;
  user: Types.ObjectId;
  startDate: Date;
  endDate: Date;
}

const reservationSchema = new Schema<IReservation>({
  resourceType: { 
    type: String,
    required: true,
    enum: ['ConferenceRoom', 'Car', 'OfficeDesk', 'Equipment']
  },
  resourceId: { 
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'resourceType'
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
}, { timestamps: true });

export const Reservation = model<IReservation>('Reservation', reservationSchema);