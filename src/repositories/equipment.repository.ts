import { Equipment, IEquipment } from '../models/equipment.model';

export class EquipmentRepository {
  async findAll() {
    return await Equipment.find();
  }

  async findById(id: string) {
    return await Equipment.findById(id);
  }

  async create(data: Partial<IEquipment>) {
    return await Equipment.create(data);
  }

  async update(id: string, updateData: Partial<IEquipment>) {
    return await Equipment.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return await Equipment.findByIdAndDelete(id);
  }
}