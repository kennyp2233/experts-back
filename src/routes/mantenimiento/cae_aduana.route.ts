import express from 'express';
import { createAduana, deleteAduana, getAduana, getAduanas, updateAduana, deleteAduanas } from '@services/mantenimiento/cae_aduana.servicio';
import { CaeAduanaCreationAttributes, CaeAduana } from '@typesApp/entities/mantenimiento/CaeAduanaTypes';

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
        const resultado = await createAduana(req.body as CaeAduanaCreationAttributes);
        res.status(201).json({ ok: true, msg: 'Aduana creada', resultado });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/aduanas', async (req, res) => {
    try {
        await updateAduana(req.body as CaeAduana);
        res.status(200).json({ ok: true, msg: 'Aduana actualizada' });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/aduanas', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await deleteAduana(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await deleteAduanas(req.body as number[]));
        }
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;
