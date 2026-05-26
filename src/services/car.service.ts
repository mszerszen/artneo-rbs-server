import { CarRepository } from '../repositories/car.repository';
import { ICar } from '../models/car.model';
import { redisClient } from '../config/redis';

const carRepository = new CarRepository();

export class CarService {
  async getAllCars() {
    const cacheKey = 'cars:all';
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const cars = await carRepository.findAll();
    await redisClient.setex(cacheKey, 3600, JSON.stringify(cars));
    return cars;
  }

  async getCarById(id: string) {
    const cacheKey = `cars:${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const car = await carRepository.findById(id);
    if (!car) throw new Error('Car not found');
    
    await redisClient.setex(cacheKey, 3600, JSON.stringify(car));
    return car;
  }

  async createCar(data: Partial<ICar>) {
    const newCar = await carRepository.create(data);
    await redisClient.del('cars:all');
    return newCar;
  }

  async updateCar(id: string, data: Partial<ICar>) {
    const updated = await carRepository.update(id, data);
    if (!updated) throw new Error('Car not found for update');
    
    await redisClient.del('cars:all');
    await redisClient.del(`cars:${id}`);
    return updated;
  }

  async deleteCar(id: string) {
    const deleted = await carRepository.delete(id);
    if (!deleted) throw new Error('Car not found for deletion');
    
    await redisClient.del('cars:all');
    await redisClient.del(`cars:${id}`);
    return deleted;
  }
}