import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ReservationService } from '../services/reservation.service';

const reservationService = new ReservationService();

export class ReservationController {
  static async getAll(req: AuthRequest, res: Response) {
    const data = await reservationService.getReservations(req.query);
    res.json(data);
  }

  static async create(req: AuthRequest, res: Response) {
    try {
      const result = await reservationService.createReservation(req.user!.id, req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const result = await reservationService.updateReservation(
        req.params.id as string, req.user!.id, req.user!.role, req.body
      );
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      await reservationService.deleteReservation(req.params.id as string, req.user!.id, req.user!.role);
      res.json({ message: 'Reservation removed' });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}