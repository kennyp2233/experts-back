import express from 'express';
import aerolinea from '../services/aerolineas.servicio';
import { AerolineaCreationAttributesI } from '../../type';


const router = express.Router();
const aero = new aerolinea();

router.get('/aerolineas', async (req, res) => {
    if (req.query.id) {
        const id = (req.query as { id: string }).id;
        res.send(await aero.getAerolinea(Number.parseInt(id)));
    } else {
        res.send(await aero.getAerolineas());
    }
});

router.post('/aerolineas', async (req, res) => {
    try {
        aero.createAerolinea(req.body);
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