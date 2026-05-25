import { Request, Response } from 'express';
import { CarService } from '../services/car.service';

const carService = new CarService();

export class CarController {
  static async getAll(req: Request, res: Response) {
    const cars = await carService.getAllCars();
    res.json(cars);
  }

  static async getById(req: Request, res: Response) {
    try {
      const car = await carService.getCarById(req.params.id as string);
      res.json(car);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const newCar = await carService.createCar(req.body);
      res.status(201).json(newCar);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await carService.updateCar(req.params.id as string, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await carService.deleteCar(req.params.id as string);
      res.json({ message: 'Car deleted successfully' });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}