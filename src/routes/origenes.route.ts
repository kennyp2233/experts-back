import express from 'express';
import { createOrigen, deleteOrigen, getOrigen, getOrigenes, updateOrigen } from '@services/origenes.servicio';
import { Origen, OrigenCreationAttributes } from '@typesApp/entities/OrigenTypes';

const router = express.Router();

router.get('/origenes', async (req, res) => {
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

router.post('/origenes', async (req, res) => {
    try {
        createOrigen(req.body as OrigenCreationAttributes);
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/origenes', (_, res) => {
    res.send('Creando origen');
}
);

router.delete('/origenes', (_, res) => {
    res.send('Creando origen');
}
);

export default router;
