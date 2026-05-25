import { User, IUser } from '../models/user.model';

export class UserRepository {
  async findAll() {
    return await User.find().select('-password');
  }

  async findById(id: string) {
    return await User.findById(id).select('-password');
  }

  async findByLogin(login: string) {
    return await User.findOne({ login });
  }

  async create(userData: Partial<IUser>) {
    return await User.create(userData);
  }

  async update(id: string, updateData: Partial<IUser>) {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
  }

  async delete(id: string) {
    return await User.findByIdAndDelete(id);
  }
}