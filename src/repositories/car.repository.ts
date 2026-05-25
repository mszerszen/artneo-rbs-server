import { Car, ICar } from '../models/car.model';

export class CarRepository {
  async findAll() {
    return await Car.find();
  }

  async findById(id: string) {
    return await Car.findById(id);
  }

  async create(data: Partial<ICar>) {
    return await Car.create(data);
  }

  async update(id: string, updateData: Partial<ICar>) {
    return await Car.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return await Car.findByIdAndDelete(id);
  }
}