import express from 'express';
import { createAerolinea, deleteAerolineas, getAerolinea, getAerolineas, updateAerolinea, aerolineaJoinAll } from '@services/mantenimiento/aerolineas.servicio';
import { Aerolinea, AerolineaCreationAttributes } from '@typesApp/entities/mantenimiento/AerolineaTypes';


const router = express.Router();

router.get('/aerolineas', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getAerolinea(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getAerolineas());
        }
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/aerolineas', async (req, res) => {
    try {
        createAerolinea(req.body as AerolineaCreationAttributes);
        res.status(201).json({
            ok: true,
            msg: 'Creando aerolinea',
        });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/aerolineas', async (req, res) => {
    try {
        updateAerolinea(req.body as Aerolinea);
        res.status(200).json({
            ok: true,
            msg: 'Actualizando aerolinea',
        });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/aerolineas', async (req, res) => {
    try {
        const aerolineas = req.body as any[];
        deleteAerolineas(aerolineas.map(Number));
        res.status(200).json({
            ok: true,
            msg: 'Eliminando aerolinea',
        });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.get('/aerolineas/joinAll', async (req, res) => {
    try {
        res.send(await aerolineaJoinAll());
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});



export default router;