// middlewares/jwtMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY, SECRET_REFRESH_KEY } from '@db/config';
import { isUserAdmin } from '@services/usuarios/admins.servicio';
import { UUID } from 'crypto';

declare global {
    namespace Express {
        interface Request {
            auth?: {
                id_usuario: UUID;
                admin: boolean;
            };
        }
    }
}

export const jwtMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    // Verificar si el access token está ausente o ha expirado
    if (!accessToken || (err && err.name === 'UnauthorizedError' && err.inner.name === 'TokenExpiredError')) {
        if (!refreshToken) {
            // No hay refresh token, el usuario no está autenticado
            res.status(401).json({ ok: false, msg: 'No autenticado - Refresh Token faltante' });
        }

        try {
            // Verificar el refresh token
            const refreshDecoded = jwt.verify(refreshToken, SECRET_REFRESH_KEY as string) as { id_usuario: UUID };
            const isAdmin = await isUserAdmin(refreshDecoded.id_usuario);

            // Generar un nuevo access token
            const newAccessToken = jwt.sign(
                { id_usuario: refreshDecoded.id_usuario, admin: isAdmin },
                SECRET_KEY as string,
                { expiresIn: '15m' }
            );

            // Establecer el nuevo access token en la cookie
            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000, // 15 minutos
            });

            req.auth = { id_usuario: refreshDecoded.id_usuario, admin: isAdmin || false };
            next();
        } catch (refreshErr) {
            // Si el refresh token es inválido, eliminar ambos tokens y forzar re-autenticación
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.status(401).json({ ok: false, msg: 'No autenticado - Refresh Token inválido' });
        }
    } else {
        // Si el access token aún es válido, proceder
        next(err);
    }
};
