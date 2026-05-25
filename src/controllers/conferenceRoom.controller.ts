import { Request, Response } from 'express';
import { ConferenceRoomService } from '../services/conferenceRoom.service';

const roomService = new ConferenceRoomService();

export class ConferenceRoomController {
  static async getAll(req: Request, res: Response) {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  }

  static async getById(req: Request, res: Response) {
    try {
      const room = await roomService.getRoomById(req.params.id as string);
      res.json(room);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const newRoom = await roomService.createRoom(req.body);
      res.status(201).json(newRoom);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await roomService.updateRoom(req.params.id as string, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await roomService.deleteRoom(req.params.id as string);
      res.json({ message: 'Sala została usunięta' });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}