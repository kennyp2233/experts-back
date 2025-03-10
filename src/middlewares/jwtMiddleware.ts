import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY, SECRET_REFRESH_KEY } from '@db/config';
import { getUserRoles } from '@services/usuarios/usuarios.servicio';
import { UUID } from 'crypto';

// Interfaz para extender Request con la propiedad auth
interface AuthenticatedRequest extends Request {
    auth?: {
        id_usuario: UUID;
        roles: any[];
        iat: number;
        exp: number;
    };
}

export const jwtMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.access_token;
        const refreshToken = req.cookies.refresh_token;

        // Caso 1: El access token existe y es válido
        if (accessToken) {
            try {
                const decoded = jwt.verify(accessToken, SECRET_KEY as string) as any;
                req.auth = {
                    id_usuario: decoded.id_usuario,
                    roles: decoded.rol,
                    iat: decoded.iat,
                    exp: decoded.exp
                };
                return next();
            } catch (tokenErr) {
                // Si el error no es por expiración, no intentamos usar el refresh token
                if (tokenErr instanceof Error && tokenErr.name !== 'TokenExpiredError') {
                    return res.status(401).json({ ok: false, msg: 'Token inválido' });
                }
                // Si es error de expiración, continuamos con la lógica de refresh token
            }
        }

        // Caso 2: No hay access token o expiró, intentamos usar refresh token
        if (refreshToken) {
            try {
                const refreshDecoded = jwt.verify(refreshToken, SECRET_REFRESH_KEY as string) as { id_usuario: UUID };

                // Obtener el rol del usuario
                const userRole = await getUserRoles(refreshDecoded.id_usuario);
                if (!userRole) {
                    throw new Error('El usuario no tiene un rol asignado');
                }

                const newAccessToken = jwt.sign(
                    {
                        id_usuario: refreshDecoded.id_usuario,
                        roles: userRole
                    },
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

                req.auth = {
                    id_usuario: refreshDecoded.id_usuario,
                    roles: userRole,
                    iat: Date.now(),
                    exp: Date.now() + 15 * 60 * 1000
                };
                return next();
            } catch (refreshErr) {
                // Si el refresh token es inválido, borramos cookies
                res.clearCookie('access_token');
                res.clearCookie('refresh_token');
                return res.status(401).json({ ok: false, msg: 'No autenticado - Refresh Token inválido' });
            }
        }

        // Caso 3: No hay tokens válidos
        return res.status(401).json({ ok: false, msg: 'No autenticado - Tokens faltantes' });
    } catch (error) {
        // Maneja cualquier error inesperado
        console.error('Error en jwtMiddleware:', error);
        return res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};