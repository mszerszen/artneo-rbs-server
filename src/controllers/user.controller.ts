import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  static async login(req: AuthRequest, res: Response) {
    try {
      const result = await userService.login(req.body.login, req.body.password);
      res.json(result);
    } catch (err: any) { res.status(400).json({ message: err.message }); }
  }

  static async register(req: AuthRequest, res: Response) {
    try {
      const user = await userService.register(req.body);
      res.status(201).json(user);
    } catch (err: any) { res.status(400).json({ message: err.message }); }
  }

  static async getMe(req: AuthRequest, res: Response) {
    const user = await userService.getUserById(req.user!.id);
    res.json(user);
  }

  static async getAll(req: AuthRequest, res: Response) {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  static async getById(req: AuthRequest, res: Response) {
    const user = await userService.getUserById(req.params.id as string);
    res.json(user);
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const updated = await userService.updateUser(req.params.id as string, req.user, req.body);
      res.json(updated);
    } catch (err: any) { res.status(403).json({ message: err.message }); }
  }

  static async delete(req: AuthRequest, res: Response) {
    await userService.deleteUser(req.params.id as string);
    res.json({ message: 'Usunięto' });
  }
}