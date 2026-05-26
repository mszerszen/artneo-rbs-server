import { ConferenceRoomRepository } from '../repositories/conferenceRoom.repository';
import { IConferenceRoom } from '../models/conferenceRoom.model';
import { redisClient } from '../config/redis';

const roomRepository = new ConferenceRoomRepository();

export class ConferenceRoomService {
  async getAllRooms() {
    const cacheKey = 'rooms:all';
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const rooms = await roomRepository.findAll();
    await redisClient.setex(cacheKey, 3600, JSON.stringify(rooms));
    return rooms;
  }

  async getRoomById(id: string) {
    const cacheKey = `rooms:${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const room = await roomRepository.findById(id);
    if (!room) throw new Error('Nie znaleziono sali konferencyjnej');
    
    await redisClient.setex(cacheKey, 3600, JSON.stringify(room));
    return room;
  }

  async createRoom(data: Partial<IConferenceRoom>) {
    const newRoom = await roomRepository.create(data);
    await redisClient.del('rooms:all');
    return newRoom;
  }

  async updateRoom(id: string, data: Partial<IConferenceRoom>) {
    const updated = await roomRepository.update(id, data);
    if (!updated) throw new Error('Nie znaleziono sali do aktualizacji');
    
    await redisClient.del('rooms:all');
    await redisClient.del(`rooms:${id}`);
    return updated;
  }

  async deleteRoom(id: string) {
    const deleted = await roomRepository.delete(id);
    if (!deleted) throw new Error('Nie znaleziono sali do usunięcia');
    
    await redisClient.del('rooms:all');
    await redisClient.del(`rooms:${id}`);
    return deleted;
  }
}