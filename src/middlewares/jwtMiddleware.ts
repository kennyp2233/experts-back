import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY, SECRET_REFRESH_KEY } from '@db/config';
import { getUserRole } from '@services/usuarios/auth.servicio';
import { UUID } from 'crypto';

export const jwtMiddleware = async (err: any, req: any, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    // Si no hay error y el access token es válido, procede normalmente
    if (!err && accessToken) {
        try {
            const decoded = jwt.verify(accessToken, SECRET_KEY as string) as any;
            req.auth = { id_usuario: decoded.id_usuario, rol: decoded.rol, iat: decoded.iat, exp: decoded.exp };
            return next();
        } catch (tokenErr) {
            if (tokenErr instanceof Error && tokenErr.name !== 'TokenExpiredError') {
                // Si el error no es por expiración, devuelve error
                return res.status(401).json({ ok: false, msg: 'Token inválido' });
            }
        }
    }

    // Verificar si el access token ha expirado
    if (!accessToken || (err && err.name === 'UnauthorizedError' && err.inner.name === 'TokenExpiredError')) {
        if (!refreshToken) {
            // Si no hay refresh token, el usuario no está autenticado
            return res.status(401).json({ ok: false, msg: 'No autenticado - Refresh Token faltante' });
        }

        try {
            // Verificar el refresh token
            const refreshDecoded = jwt.verify(refreshToken, SECRET_REFRESH_KEY as string) as { id_usuario: UUID };

            // Obtener el rol del usuario
            const userRole = await getUserRole(refreshDecoded.id_usuario);
            if (!userRole) {
                throw new Error('El usuario no tiene un rol asignado');
            }

            // Generar un nuevo access token
            const newAccessToken = jwt.sign(
                { id_usuario: refreshDecoded.id_usuario, rol: userRole },
                SECRET_KEY as string,
                { expiresIn: '15m' }
            );

            // Configurar la nueva cookie del access token
            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000, // 15 minutos
            });

            req.auth = { id_usuario: refreshDecoded.id_usuario, rol: userRole, iat: Date.now(), exp: Date.now() + 15 * 60 * 1000 };
            return next();
        } catch (refreshErr) {
            // Si el refresh token es inválido, borra las cookies y fuerza la reautenticación
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            return res.status(401).json({ ok: false, msg: 'No autenticado - Refresh Token inválido' });
        }
    }

    // Si hay otro tipo de error, pásalo al siguiente manejador de errores
    return next(err);
};
