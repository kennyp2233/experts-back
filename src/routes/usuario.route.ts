import express from 'express';
import { createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from '@services/usuarios.servicio';

const router = express.Router();

router.get('/usuarios', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getUsuario(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getUsuarios());
        }
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

