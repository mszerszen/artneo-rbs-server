import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Brak autoryzacji' });

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET || 'secret') as any;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token nieprawidłowy' });
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Wymagane uprawnienia admina' });
  }
  next();
};