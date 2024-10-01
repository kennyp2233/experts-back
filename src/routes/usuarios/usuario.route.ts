import express, { Request, Response, NextFunction } from 'express';
import { createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from '@services/usuarios/usuarios.servicio';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.id) {
            const id = Number.parseInt(req.query.id as string);
            if (isNaN(id)) {
                throw new Error('ID inválido');
            }
            const usuario = await getUsuario(id);
            res.status(200).json({
                ok: true,
                data: usuario
            });
        } else {
            const usuarios = await getUsuarios();
            res.status(200).json({
                ok: true,
                data: usuarios
            });
        }
    } catch (error: any) {
        next(error);
    }
});
