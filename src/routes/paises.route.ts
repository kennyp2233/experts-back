import express from 'express';
import { createPais, deletePais, getPais, getPaises, updatePais, paisesJoinAcuerdos, deletePaises } from '@services/paises.servicio';
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
    // si req.body.pais_id no es int retornar error

    if (!Number.isInteger(Number(req.body.pais_id))) {
        res.status(400).json({ ok: false, msg: 'El id del pais debe ser un número' });
        return;
    }

    try {
        const pais = await createPais(req.body);
        res.json(pais);
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/paises', (req, res) => {

    if (!Number.isInteger(Number(req.body.pais_id))) {
        res.status(400).json({ ok: false, msg: 'El id del pais debe ser un número' });
        return;
    }
    try {
        //haz el update con la funcion updatePais(req.body as Pais);
        updatePais(req.body as Pais);
        res.status(200).json({ ok: true, msg: 'Pais actualizado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/paises', (req, res) => {

    try {
        //deletePais(Number.parseInt((req.body as Pais).id_pais.toString()));
        console.log(req.body);
        const paises = req.body as any[];
        deletePaises(paises.map(Number));
        res.status(200).json({ ok: true, msg: 'Pais eliminado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});


export default router;