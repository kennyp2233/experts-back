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

    // If there's no error and a valid access token, just proceed
    if (!err && accessToken) {
        return next();
    }

    // Verify if the access token is absent or has expired
    if (!accessToken || (err && err.name === 'UnauthorizedError' && err.inner.name === 'TokenExpiredError')) {
        if (!refreshToken) {
            // No refresh token, the user is not authenticated
            return res.status(401).json({ ok: false, msg: 'No autenticado - Refresh Token faltante' });
        }

        try {
            // Verify the refresh token
            const refreshDecoded = jwt.verify(refreshToken, SECRET_REFRESH_KEY as string) as { id_usuario: UUID };
            const isAdmin = await isUserAdmin(refreshDecoded.id_usuario);

            // Generate a new access token
            const newAccessToken = jwt.sign(
                { id_usuario: refreshDecoded.id_usuario, admin: isAdmin },
                SECRET_KEY as string,
                { expiresIn: '15m' }
            );

            // Set the new access token in the cookie
            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000, // 15 minutes
            });

            req.auth = { id_usuario: refreshDecoded.id_usuario, admin: isAdmin || false };
            return next();
        } catch (refreshErr) {
            // If the refresh token is invalid, remove both tokens and force re-authentication
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            return res.status(401).json({ ok: false, msg: 'No autenticado - Refresh Token inválido' });
        }
    } else {
        // If there's another type of error, pass it to the next error handler
        return next(err);
    }
};