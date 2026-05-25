import { EquipmentRepository } from '../repositories/equipment.repository';
import { IEquipment } from '../models/equipment.model';

const equipmentRepository = new EquipmentRepository();

export class EquipmentService {
  async getAllEquipment() {
    return await equipmentRepository.findAll();
  }

  async getEquipmentById(id: string) {
    const item = await equipmentRepository.findById(id);
    if (!item) throw new Error('Equipment item not found');
    return item;
  }

  async createEquipment(data: Partial<IEquipment>) {
    return await equipmentRepository.create(data);
  }

  async updateEquipment(id: string, data: Partial<IEquipment>) {
    const updated = await equipmentRepository.update(id, data);
    if (!updated) throw new Error('Equipment not found for update');
    return updated;
  }

  async deleteEquipment(id: string) {
    const deleted = await equipmentRepository.delete(id);
    if (!deleted) throw new Error('Equipment not found for deletion');
    return deleted;
  }
}