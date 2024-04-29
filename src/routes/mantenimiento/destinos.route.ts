import express from 'express';
import { createDestino, getDestino, getDestinos, updateDestino, deleteDestinos, getDestinosJoinPais } from '@services/mantenimiento/destinos.servicio';
import { Destino, DestinoCreationAttributes } from '@typesApp/entities/mantenimiento/DestinoTypes';

const router = express.Router();

router.get('/destinos', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getDestino(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getDestinos());
        }
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
}
);

router.get('/destinos/paises', async (req, res) => {
    try {
        res.send(await getDestinosJoinPais());
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/destinos', async (req, res) => {
    console.log(req.body);
    try {
        await createDestino(req.body as DestinoCreationAttributes);
        res.status(201).json({ ok: true, msg: 'Destino creado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/destinos', async (req, res) => {
    try {
        await updateDestino(req.body as Destino);
        res.status(200).json({ ok: true, msg: 'Destino actualizado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/destinos', async (req, res) => {
    try {
        const destinos = req.body as any[];
        await deleteDestinos(destinos.map(Number));
        res.status(200).json({ ok: true, msg: 'Destino eliminado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;