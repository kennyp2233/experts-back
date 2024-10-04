// src/middlewares/authorize.ts
import { Request, Response, NextFunction } from 'express';

type Role = 'admin' | 'user'; // Define los roles que tengas

export const authorize = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = req.auth;

        if (!user) {
            res.status(401).json({ message: 'No autenticado rol' });
            return;
        }

        const userRole: Role = user?.admin ? 'admin' : 'user';

        if (!allowedRoles.includes(userRole)) {
            res.status(403).json({ message: 'Acceso prohibido rol' });
            return;
        }

        // Si tienes más roles, agrega más condiciones aquí

        next();
    };
};
