import express from 'express';
import { createAerolinea, deleteAerolinea, getAerolinea, getAerolineas, updateAerolinea } from '@services/aerolineas.servicio';
import { Aerolinea, AerolineaCreationAttributes } from '@typesApp/entities/AerolineaTypes';


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

router.put('/aerolineas', (_, res) => {
    res.send('Creando aerolinea');
});

router.delete('/aerolineas', (_, res) => {
    res.send('Creando aerolinea');
});

export default router;