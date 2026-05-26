import { EquipmentRepository } from '../repositories/equipment.repository';
import { IEquipment } from '../models/equipment.model';
import { redisClient } from '../config/redis';

const equipmentRepository = new EquipmentRepository();

export class EquipmentService {
  async getAllEquipment() {
    const cacheKey = 'equipment:all';
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const items = await equipmentRepository.findAll();
    await redisClient.setex(cacheKey, 3600, JSON.stringify(items));
    return items;
  }

  async getEquipmentById(id: string) {
    const cacheKey = `equipment:${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const item = await equipmentRepository.findById(id);
    if (!item) throw new Error('Equipment item not found');
    
    await redisClient.setex(cacheKey, 3600, JSON.stringify(item));
    return item;
  }

  async createEquipment(data: Partial<IEquipment>) {
    const newEq = await equipmentRepository.create(data);
    await redisClient.del('equipment:all');
    return newEq;
  }

  async updateEquipment(id: string, data: Partial<IEquipment>) {
    const updated = await equipmentRepository.update(id, data);
    if (!updated) throw new Error('Equipment not found for update');

    await redisClient.del('equipment:all');
    await redisClient.del(`equipment:${id}`);
    return updated;
  }

  async deleteEquipment(id: string) {
    const deleted = await equipmentRepository.delete(id);
    if (!deleted) throw new Error('Equipment not found for deletion');

    await redisClient.del('equipment:all');
    await redisClient.del(`equipment:${id}`);
    return deleted;
  }
}