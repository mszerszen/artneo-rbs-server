import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

const userRepository = new UserRepository();

export class UserService {
  async register(data: any) {
    const hashed = await bcrypt.hash(data.password, 12);
    return await userRepository.create({ ...data, password: hashed });
  }

  async login(login: string, pass: string) {
    const user = await userRepository.findByLogin(login);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new Error('Błędne dane logowania');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, ENV.JWT_SECRET || 'secret', { expiresIn: '1d' });
    return { token, user: { id: user._id, login: user.login, role: user.role } };
  }

  async getAllUsers() { return await userRepository.findAll(); }
  async getUserById(id: string) { return await userRepository.findById(id); }
  
  async updateUser(id: string, requester: any, updateData: any) {
    if (requester.role !== 'admin' && requester.id !== id) {
      throw new Error('Brak uprawnień do edycji tego użytkownika');
    }
    if (updateData.password) updateData.password = await bcrypt.hash(updateData.password, 12);
    return await userRepository.update(id, updateData);
  }

  async deleteUser(id: string) { return await userRepository.delete(id); }
}