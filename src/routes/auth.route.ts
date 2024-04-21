import express from 'express';
import { login, register } from '@services/auth.servicio';

const router = express.Router();


router.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.usuario, req.body.password, req.body.recordar);
        if (token) {
            res.status(200).json({
                ok: true,
                msg: 'Login exitoso',
                token
            });
        } else {
            res.status(401).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos'
            });
        }
    } catch (error: any) {
        res.status(400).json({ error: true, message: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = await register(req.body);
        res.status(201).json({
            ok: true,
            msg: 'Usuario creado exitosamente',
            user
        });
    } catch (error: any) {
        res.status(400).json({ error: true, message: error.message });
    }
});

export default router;