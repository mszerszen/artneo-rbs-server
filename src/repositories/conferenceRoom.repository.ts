import { ConferenceRoom, IConferenceRoom } from '../models/conferenceRoom.model';

export class ConferenceRoomRepository {
  async findAll() {
    return await ConferenceRoom.find();
  }

  async findById(id: string) {
    return await ConferenceRoom.findById(id);
  }

  async create(data: Partial<IConferenceRoom>) {
    return await ConferenceRoom.create(data);
  }

  async update(id: string, updateData: Partial<IConferenceRoom>) {
    return await ConferenceRoom.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return await ConferenceRoom.findByIdAndDelete(id);
  }
}