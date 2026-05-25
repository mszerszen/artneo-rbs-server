import { OfficeDesk, IOfficeDesk } from '../models/officeDesk.model';

export class OfficeDeskRepository {
  async findAll() {
    return await OfficeDesk.find();
  }

  async findById(id: string) {
    return await OfficeDesk.findById(id);
  }

  async create(data: Partial<IOfficeDesk>) {
    return await OfficeDesk.create(data);
  }

  async update(id: string, updateData: Partial<IOfficeDesk>) {
    return await OfficeDesk.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return await OfficeDesk.findByIdAndDelete(id);
  }
}