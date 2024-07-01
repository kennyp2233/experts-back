import express from 'express';

import { createEmbarcador, deleteEmbarcadores, getEmbarcador, getEmbarcadores, updateEmbarcador } from '@services/mantenimiento/embarcadores.servicio';
import { Embarcador, EmbarcadorCreationAttributes } from '@typesApp/entities/mantenimiento/EmbarcadoresTypes';

const router = express.Router();

router.get('/embarcadores', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getEmbarcador(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getEmbarcadores());
        }
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/embarcadores', async (req, res) => {
    try {
        const embarcador = await createEmbarcador(req.body as EmbarcadorCreationAttributes);
        res.status(201).json({ ok: true, msg: 'Embarcador creado', embarcador });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/embarcadores', async (req, res) => {
    try {
        await updateEmbarcador(req.body as Embarcador);
        res.status(200).json({ ok: true, msg: 'Embarcador actualizado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/embarcadores', async (req, res) => {
    try {
        const embarcadores = req.body as any[];
        await deleteEmbarcadores(embarcadores.map(Number));
        res.status(200).json({ ok: true, msg: 'Embarcador eliminado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;
