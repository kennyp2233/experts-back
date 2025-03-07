// src/middlewares/authorize.ts
import { getUserRole } from '@services/usuarios/usuarios.servicio';
import { Request, Response, NextFunction } from 'express';

type Role = string; // Usa `string` para roles dinámicos

export const authorize = (...allowedRoles: Role[]) => {
    return async (req: any, res: Response, next: NextFunction): Promise<void> => {
        const user = req.auth;

        if (!user) {
            res.status(401).json({ message: 'No autenticado' });
            return;
        }

        // Obtener el rol actualizado directamente de la base de datos
        const userRole: Role | null = await getUserRole(user.id_usuario);
        
        if (!userRole) {
            res.status(403).json({ message: 'Usuario sin rol asignado' });
            return;
        }

        if (!allowedRoles.includes(userRole)) {
            res.status(403).json({ message: 'Acceso prohibido - rol no permitido' });
            return;
        }

        // Actualizar el rol en req.auth con el valor fresco de la base de datos
        req.auth.rol = userRole;
        next();
    };
};