import { Request, Response } from 'express';
import { EquipmentService } from '../services/equipment.service';

const equipmentService = new EquipmentService();

export class EquipmentController {
  static async getAll(req: Request, res: Response) {
    const items = await equipmentService.getAllEquipment();
    res.json(items);
  }

  static async getById(req: Request, res: Response) {
    try {
      const item = await equipmentService.getEquipmentById(req.params.id as string);
      res.json(item);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const newItem = await equipmentService.createEquipment(req.body);
      res.status(201).json(newItem);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await equipmentService.updateEquipment(req.params.id as string, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await equipmentService.deleteEquipment(req.params.id as string);
      res.json({ message: 'Equipment deleted successfully' });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}