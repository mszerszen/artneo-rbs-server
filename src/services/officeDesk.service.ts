import { OfficeDeskRepository } from '../repositories/officeDesk.repository';
import { IOfficeDesk } from '../models/officeDesk.model';
import { redisClient } from '../config/redis';

const deskRepository = new OfficeDeskRepository();

export class OfficeDeskService {
  async getAllDesks() {
    const cacheKey = 'desks:all';
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const desks = await deskRepository.findAll();
    await redisClient.setex(cacheKey, 3600, JSON.stringify(desks));
    return desks;
  }

  async getDeskById(id: string) {
    const cacheKey = `desks:${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const desk = await deskRepository.findById(id);
    if (!desk) throw new Error('Office desk not found');
    
    await redisClient.setex(cacheKey, 3600, JSON.stringify(desk));
    return desk;
  }

  async createDesk(data: Partial<IOfficeDesk>) {
    const newDesk = await deskRepository.create(data);
    await redisClient.del('desks:all');
    return newDesk;
  }

  async updateDesk(id: string, data: Partial<IOfficeDesk>) {
    const updated = await deskRepository.update(id, data);
    if (!updated) throw new Error('Office desk not found for update');

    await redisClient.del('desks:all');
    await redisClient.del(`desks:${id}`);
    return updated;
  }

  async deleteDesk(id: string) {
    const deleted = await deskRepository.delete(id);
    if (!deleted) throw new Error('Office desk not found for deletion');

    await redisClient.del('desks:all');
    await redisClient.del(`desks:${id}`);
    return deleted;
  }
}