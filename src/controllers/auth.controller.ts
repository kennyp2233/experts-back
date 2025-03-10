// src/controllers/auth.controller.ts

import { Request, Response, NextFunction } from 'express';
import { login, register, refreshToken } from '@services/usuarios/auth.servicio';
import { getUserRoles } from '@services/usuarios/usuarios.servicio';
import { UUID } from 'crypto';

interface CustomRequest extends Request {
    auth?: {
        id_usuario: UUID;
        roles: string[];
        iat: number;
        exp: number;
    };
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usuario, pass, recordar } = req.body;
        const result = await login(usuario, pass, recordar || false);

        // Configurar cookies
        res.cookie('access_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000, // 15 minutos
        });

        res.cookie('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: recordar ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 7 días o 1 hora
        });

        res.status(200).json({
            ok: true,
            msg: 'Login exitoso',
        });
    } catch (error) {
        next(error);
    }
};

export const logoutController = (req: Request, res: Response) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ ok: true, msg: 'Sesión cerrada' });
};

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usuario, email, pass, nombre, empresa, telefono, selectedRole, ...additionalData } = req.body;

        const result = await register(
            usuario,
            email,
            pass,
            nombre,
            empresa,
            telefono,
            selectedRole,
            additionalData
        );

        if (result.ok) {
            res.status(201).json({
                ok: true,
                msg: 'Registro exitoso. Su cuenta está pendiente de aprobación.',
            });
        } else {
            res.status(400).json({
                ok: false,
                msg: result.msg || 'Error al registrar usuario',
            });
        }
    } catch (error) {
        next(error);
    }
};

export const getMeController = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.auth) {
        return res.status(401).json({ ok: false, msg: 'No autenticado' });
    }

    try {
        // Obtener los roles actualizados del usuario
        const roles = await getUserRoles(req.auth.id_usuario);

        return res.status(200).json({
            ok: true,
            user: {
                id: req.auth.id_usuario,
                roles: roles
            },
        });
    } catch (error) {
        next(error);
        return;
    }
};