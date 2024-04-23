import express from 'express';
import { login, register, verifyToken, isAdminToken } from '@services/auth.servicio';

const router = express.Router();

router.post('/login', async (req, res) => {
    const result = await login(req.body.usuario, req.body.pass, req.body.recordar);
    if ('error' in (result as any)) {
        res.status(400).json({ ok: false, msg: (result as any).error });
    } else {
        res.status(200).json({
            ok: true,
            msg: 'Login exitoso',
            token: result.token
        });
    }
});

router.post('/register', async (req, res) => {
    const result = await register(req.body);
    if ('error' in (result as any)) {
        res.status(400).json({ ok: false, msg: (result as any).error });
        console.log(result);
    } else {
        res.status(200).json({
            ok: true,
            msg: 'Registro exitoso',
        });
    }
});

router.post('/verify', async (req, res) => {
    const token = req.body.token;
    if (!token) {
        res.status(400).json({ ok: false, msg: 'Token no provisto' });
        return;
    }
    const result = await verifyToken(token);
    if ('error' in (result as any)) {
        res.status(400).json({ ok: false, msg: (result as any).error });
    } else {
        res.status(200).json({
            ok: true,
            msg: 'Token válido',
        });
    }
});

router.post('/isAdmin', async (req, res) => {
    const token = req.body.token;
    if (!token) {
        res.status(400).json({ ok: false, msg: 'Token no provisto' });
        return;
    }
    const result = await isAdminToken(token);
    if ('error' in (result as any)) {
        res.status(400).json({ ok: false, msg: (result as any).error });
    } else {
        res.status(200).json({
            ok: true,
            msg: 'Token válido',
            isAdmin: (result as any).isAdmin
        });
    }
});

export default router;