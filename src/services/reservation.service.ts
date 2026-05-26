import { ReservationRepository } from '../repositories/reservation.repository';

const reservationRepo = new ReservationRepository();

export class ReservationService {
  async createReservation(userId: string, data: any) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const now = new Date();

    if (start < now) {
      throw new Error('Cannot create a reservation for a past date');
    }

    if (start >= end) throw new Error('Invalid dates: End must be after start');

    const overlap = await reservationRepo.checkOverlap(data.resourceId, start, end);
    if (overlap) {
      throw new Error('Resource is already reserved for this time period');
    }

    return await reservationRepo.create({
      ...data,
      user: userId as any,
      startDate: start,
      endDate: end
    });
  }

  async updateReservation(id: string, userId: string, role: string, data: any) {
    const existing = await reservationRepo.findById(id);
    if (!existing) throw new Error('Reservation not found');

    if (existing.user.toString() !== userId && role !== 'admin') {
      throw new Error('No permission to update');
    }

    if (data.startDate || data.endDate || data.resourceId) {
      const start = data.startDate ? new Date(data.startDate) : existing.startDate;
      const end = data.endDate ? new Date(data.endDate) : existing.endDate;
      const resId = data.resourceId || existing.resourceId.toString();
      const now = new Date();

      if (start < now) {
        throw new Error('Cannot create a reservation for a past date');
      }

      if (start >= end) throw new Error('Invalid dates: End must be after start');

      const overlap = await reservationRepo.checkOverlap(resId, start, end, id);
      if (overlap) throw new Error('New time period overlaps with an existing reservation');
    }

    return await reservationRepo.update(id, data);
  }

  async getReservations(query: any) {
    const filter: any = {};
    if (query.resourceType) filter.resourceType = query.resourceType;
    if (query.user) filter.user = query.user;
    if (query.resourceId) filter.resourceId = query.resourceId;
    if (query.availableFrom && query.availableTo) {
        const start = new Date(query.availableFrom);
        const end = new Date(query.availableTo);

        filter.$and = [
            { startDate: { $lt: end } },
            { endDate: { $gt: start } }
        ];
    }
    return await reservationRepo.findFiltered(filter);
  }

  async deleteReservation(id: string, userId: string, role: string) {
    const existing = await reservationRepo.findById(id);
    if (!existing) throw new Error('Reservation not found');

    if (existing.user.toString() !== userId && role !== 'admin') {
      throw new Error('No permission to delete');
    }

    return await reservationRepo.delete(id);
  }
}