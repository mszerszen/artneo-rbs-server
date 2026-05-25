import { OfficeDeskRepository } from '../repositories/officeDesk.repository';
import { IOfficeDesk } from '../models/officeDesk.model';

const deskRepository = new OfficeDeskRepository();

export class OfficeDeskService {
  async getAllDesks() {
    return await deskRepository.findAll();
  }

  async getDeskById(id: string) {
    const desk = await deskRepository.findById(id);
    if (!desk) throw new Error('Office desk not found');
    return desk;
  }

  async createDesk(data: Partial<IOfficeDesk>) {
    return await deskRepository.create(data);
  }

  async updateDesk(id: string, data: Partial<IOfficeDesk>) {
    const updated = await deskRepository.update(id, data);
    if (!updated) throw new Error('Office desk not found for update');
    return updated;
  }

  async deleteDesk(id: string) {
    const deleted = await deskRepository.delete(id);
    if (!deleted) throw new Error('Office desk not found for deletion');
    return deleted;
  }
}