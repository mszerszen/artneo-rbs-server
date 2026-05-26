import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { ReservationRepository } from '../repositories/reservation.repository';
import { redisClient } from '../config/redis';

const userRepository = new UserRepository();
const reservationRepository = new ReservationRepository();

export class UserService {
  async register(data: any) {
    const hashed = await bcrypt.hash(data.password, 12);
    const newUser = await userRepository.create({ ...data, password: hashed });

    await redisClient.del('users:all');
    return newUser;
  }

  async login(login: string, pass: string) {
    const user = await userRepository.findByLogin(login);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new Error('Błędne dane logowania');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, ENV.JWT_SECRET || 'secret', { expiresIn: '1d' });
    return { token, user: { id: user._id, login: user.login, role: user.role } };
  }

  async getAllUsers() {
    const cacheKey = 'users:all';
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const users = await userRepository.findAll();
    await redisClient.setex(cacheKey, 3600, JSON.stringify(users));
    return users;
  }

  async getUserById(id: string) {
    return await userRepository.findById(id); 
  }
  
  async updateUser(id: string, requester: any, updateData: any) {
    if (requester.role !== 'admin' && requester.id !== id) {
      throw new Error('Brak uprawnień do edycji tego użytkownika');
    }
    if (updateData.password) updateData.password = await bcrypt.hash(updateData.password, 12);
    const updated = await userRepository.update(id, updateData);
    await redisClient.del('users:all');
    return updated;
  }

  async deleteUser(id: string) {
    await reservationRepository.deleteManyByUserId(id);
    const deleted = await userRepository.delete(id);
    await redisClient.del('users:all');
    await redisClient.del('resources:available');
    return deleted;
  }
}