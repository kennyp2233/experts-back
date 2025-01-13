// src/middlewares/authorize.ts
import { Request, Response, NextFunction } from 'express';

type Role = string; // Usa `string` para roles dinámicos

export const authorize = (...allowedRoles: Role[]) => {
    return (req: any, res: Response, next: NextFunction): void => {
        const user = req.auth; // `req.auth` debe ser configurado por el middleware `jwtMiddleware`

        if (!user) {
            res.status(401).json({ message: 'No autenticado - rol' });
            return;
        }

        const userRole: Role = user.rol; // Accede al rol dinámico del usuario

        if (!allowedRoles.includes(userRole)) {
            res.status(403).json({ message: 'Acceso prohibido - rol no permitido' });
            return;
        }

        next();
    };
};
