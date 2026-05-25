import { Request, Response } from 'express';
import { OfficeDeskService } from '../services/officeDesk.service';

const deskService = new OfficeDeskService();

export class OfficeDeskController {
  static async getAll(req: Request, res: Response) {
    const desks = await deskService.getAllDesks();
    res.json(desks);
  }

  static async getById(req: Request, res: Response) {
    try {
      const desk = await deskService.getDeskById(req.params.id as string);
      res.json(desk);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const newDesk = await deskService.createDesk(req.body);
      res.status(201).json(newDesk);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await deskService.updateDesk(req.params.id as string, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await deskService.deleteDesk(req.params.id as string);
      res.json({ message: 'Office desk deleted successfully' });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}