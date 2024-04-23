import express from 'express';
import { createPais, deletePais, getPais, getPaises, updatePais, paisesJoinAcuerdos } from '@services/paises.servicio';
import { Pais, PaisCreationAttributes } from '@typesApp/entities/PaisTypes';

const router = express.Router();

router.get('/paises', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getPais(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getPaises());
        }
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.get('/paises-acuerdos', async (_, res) => {
    try {
        res.send(await paisesJoinAcuerdos());
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/paises', async (req, res) => {
    try {
        const pais = await createPais(req.body);
        res.json(pais);
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/paises', (_, res) => {
    res.send('Creando pais');
});

router.delete('/paises', (_, res) => {
    res.send('Creando pais');
});


export default router;