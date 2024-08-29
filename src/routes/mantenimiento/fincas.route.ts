import express from 'express';
import { getFincasJoinAll, createFincaWithAllData, deleteFincas, updateFincaWithAllData } from '@services/mantenimiento/fincas.servicio';
import { Finca } from '@typesApp/entities/mantenimiento/FincaTypes';

const router = express.Router();

router.get('/fincasJoinAll', async (req, res) => {
    try {
        res.send(await getFincasJoinAll());
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/fincas', async (req, res) => {
    try {
        await createFincaWithAllData(req.body as Finca);
        res.status(201).json({
            ok: true,
            msg: 'Creando finca',
        });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/fincas', async (req, res) => {
    try {
        await updateFincaWithAllData(req.body as Finca);
        res.status(201).json({
            ok: true,
            msg: 'Actualizando finca',
        });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/fincas', async (req, res) => {
    try {
        await deleteFincas(req.body);
        res.status(200).json({
            ok: true,
            msg: 'Borrando fincas',
        });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;