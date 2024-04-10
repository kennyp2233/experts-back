import express from 'express';
import { createAerolinea, deleteAerolinea, getAerolinea, getAerolineas, updateAerolinea } from '@services/aerolineas.servicio';
import { Aerolinea, AerolineaCreationAttributes } from '@typesApp/entities/AerolineaTypes';


const router = express.Router();

router.get('/aerolineas', async (req, res) => {
    if (req.query.id) {
        res.send(await getAerolinea(Number.parseInt(req.query.id as string)));
    } else {
        res.send(await getAerolineas());
    }
});

router.post('/aerolineas', async (req, res) => {
    try {
        createAerolinea(req.body as AerolineaCreationAttributes);
        res.status(201).json({
            ok: true,
            msg: 'Creando aerolinea',
            status: 201
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
            status: 500
        });
    }
});

router.put('/aerolineas', (_, res) => {
    res.send('Creando aerolinea');
});

router.delete('/aerolineas', (_, res) => {
    res.send('Creando aerolinea');
});

export default router;