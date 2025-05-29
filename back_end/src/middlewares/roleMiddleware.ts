import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware.js';

export const checkRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
       res.status(403).json({ message: `Access denied: ${role} role required` });
       return;
    }
    next();
  };
};
