import { ConferenceRoomRepository } from '../repositories/conferenceRoom.repository';
import { IConferenceRoom } from '../models/conferenceRoom.model';

const roomRepository = new ConferenceRoomRepository();

export class ConferenceRoomService {
  async getAllRooms() {
    return await roomRepository.findAll();
  }

  async getRoomById(id: string) {
    const room = await roomRepository.findById(id);
    if (!room) throw new Error('Nie znaleziono sali konferencyjnej');
    return room;
  }

  async createRoom(data: Partial<IConferenceRoom>) {
    return await roomRepository.create(data);
  }

  async updateRoom(id: string, data: Partial<IConferenceRoom>) {
    const updated = await roomRepository.update(id, data);
    if (!updated) throw new Error('Nie znaleziono sali do aktualizacji');
    return updated;
  }

  async deleteRoom(id: string) {
    const deleted = await roomRepository.delete(id);
    if (!deleted) throw new Error('Nie znaleziono sali do usunięcia');
    return deleted;
  }
}