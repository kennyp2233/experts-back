import express from 'express';
import {
    createTipoEmbarque,
    updateTipoEmbarque,
    deleteTipoEmbarque,
    deleteTipoEmbarques,
    getTiposEmbarqueJoinAll,
    getTipoEmbarque
} from '@services/mantenimiento/tipos_embarque.servicio';

const router = express.Router();

router.get('/tiposEmbarque', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getTipoEmbarque(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getTiposEmbarqueJoinAll());
        }
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/tiposEmbarque', async (req, res) => {
    try {
        console.log(req.body);
        const tipoEmbarque = await createTipoEmbarque(req.body);
        res.status(201).json({ ok: true, msg: 'Tipo de embarque creado', tipoEmbarque });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/tiposEmbarque', async (req, res) => {
    try {
        await updateTipoEmbarque(req.body);
        res.status(200).json({ ok: true, msg: 'Tipo de embarque actualizado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/tiposEmbarque', async (req, res) => {
    try {
        const tiposEmbarque = req.body as any[];
        await deleteTipoEmbarques(tiposEmbarque.map(Number));
        res.status(200).json({ ok: true, msg: 'Tipo de embarque eliminado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/tiposEmbarque/:id', async (req, res) => {
    try {
        await deleteTipoEmbarque(Number.parseInt(req.params.id));
        res.status(200).json({ ok: true, msg: 'Tipo de embarque eliminado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;