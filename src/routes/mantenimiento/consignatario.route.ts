import express from 'express';
import { getConsignatariosJoinAll } from '@services/mantenimiento/consignatario/consignatario.servicio';

const router = express.Router();

router.get('/consignatariosJoinAll', async (_, res) => {
    try {
        res.send(await getConsignatariosJoinAll());
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;

