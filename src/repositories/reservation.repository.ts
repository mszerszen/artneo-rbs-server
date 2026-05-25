import { Reservation, IReservation } from '../models/reservation.model';

export class ReservationRepository {
  async checkOverlap(resourceId: string, startDate: Date, endDate: Date, excludeId?: string) {
    const query: any = {
      resourceId,
      startDate: { $lt: endDate },
      endDate: { $gt: startDate }
    };

    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    return await Reservation.findOne(query);
  }

  async create(data: Partial<IReservation>) {
    return await Reservation.create(data);
  }

  async findFiltered(filter: any) {
    return await Reservation.find(filter).populate('user', 'fullName').populate('resourceId');
  }

  async findById(id: string) {
    return await Reservation.findById(id);
  }

  async update(id: string, data: Partial<IReservation>) {
    return await Reservation.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await Reservation.findByIdAndDelete(id);
  }
}