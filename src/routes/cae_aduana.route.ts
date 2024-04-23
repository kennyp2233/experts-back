import express from 'express';
import { createAduana, deleteAduana, getAduana, getAduanas, updateAduana } from '@services/cae_aduana.servicio';
import { CaeAduanaCreationAttributes } from '@typesApp/entities/CaeAduanaTypes';

const router = express.Router();

router.get('/aduanas', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getAduana(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getAduanas());
        }

    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/aduanas', async (req, res) => {
    try {
        const resultado = createAduana(req.body as CaeAduanaCreationAttributes);
        res.json(resultado);
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/aduanas', (_, res) => {
    res.send('Creando aduana');
});

router.delete('/aduanas', (_, res) => {
    res.send('Creando aduana');
});

export default router;
