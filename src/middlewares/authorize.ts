// src/middlewares/authorize.ts

import { Request, Response, NextFunction } from 'express';
import { getUserRoles } from '@services/usuarios/usuarios.servicio';

export const authorize = (...allowedRoles: string[]) => {
    return async (req: any, res: Response, next: NextFunction): Promise<void> => {
        const user = req.auth;

        if (!user) {
            res.status(401).json({ message: 'No autenticado' });
            return;
        }

        // Actualizar los roles directamente de la base de datos para mayor seguridad
        const userRoles = await getUserRoles(user.id_usuario);

        // Verificar si el usuario tiene al menos uno de los roles permitidos
        const hasAuthorizedRole = allowedRoles.some(role => userRoles.includes(role));

        if (!hasAuthorizedRole) {
            res.status(403).json({ message: 'Acceso prohibido - rol no permitido' });
            return;
        }

        // Actualizar roles en el objeto auth
        req.auth.roles = userRoles;
        next();
    };
};