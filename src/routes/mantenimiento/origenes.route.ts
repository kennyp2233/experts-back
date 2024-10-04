import express from 'express';
import { createOrigen, getOrigen, getOrigenes, updateOrigen, deleteOrigenes, origenJoinPaisesAduanas } from '@services/mantenimiento/origenes.servicio';
import { Origen, OrigenCreationAttributes } from '@typesApp/mantenimiento/origen.type';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getOrigen(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getOrigenes());
        }
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
}
);

router.get('/paises-aduanas', async (req, res) => {
    try {
        res.send(await origenJoinPaisesAduanas());
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        await createOrigen(req.body as OrigenCreationAttributes);
        res.status(201).json({ ok: true, msg: 'Origen creado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/', async (req, res) => {
    try {
        await updateOrigen(req.body as Origen);
        res.status(200).json({ ok: true, msg: 'Origen actualizado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const origenes = req.body as any[];
        await deleteOrigenes(origenes.map(Number));
        res.status(200).json({ ok: true, msg: 'Origen eliminado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;
