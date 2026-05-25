import { CarRepository } from '../repositories/car.repository';
import { ICar } from '../models/car.model';

const carRepository = new CarRepository();

export class CarService {
  async getAllCars() {
    return await carRepository.findAll();
  }

  async getCarById(id: string) {
    const car = await carRepository.findById(id);
    if (!car) throw new Error('Car not found');
    return car;
  }

  async createCar(data: Partial<ICar>) {
    return await carRepository.create(data);
  }

  async updateCar(id: string, data: Partial<ICar>) {
    const updated = await carRepository.update(id, data);
    if (!updated) throw new Error('Car not found for update');
    return updated;
  }

  async deleteCar(id: string) {
    const deleted = await carRepository.delete(id);
    if (!deleted) throw new Error('Car not found for deletion');
    return deleted;
  }
}