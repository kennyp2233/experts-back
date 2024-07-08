import express from 'express';
import { getConsignatariosJoinAll, createConsignatarioJoinAll, updateConsignatarioJoinAll, deleteConsignatarioJoinAll } from '@services/mantenimiento/consignatario/consignatario.servicio';

const router = express.Router();

router.get('/consignatariosJoinAll', async (_, res) => {
    try {
        res.send(await getConsignatariosJoinAll());
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});


router.post('/consignatariosJoinAll', async (req, res) => {
    try {
        const data = req.body;
        const respuesta = await createConsignatarioJoinAll(data);
        //si respuesta contiene error, contexto de posible retorno {error: 'mensaje de error'}
        if (respuesta?.error) {
            res.status(400).json({ ok: false, msg: respuesta.error });
        } else {
            res.status(201).json({
                ok: true,
                msg: 'Creando consignatario y plantilla',
            });
        }
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }

});

router.put('/consignatariosJoinAll/', async (req, res) => {
    try {
        const data = req.body;
        const respuesta = await updateConsignatarioJoinAll(data);
        //si respuesta contiene error, contexto de posible retorno {error: 'mensaje de error'}
        if (respuesta?.error) {
            res.status(400).json({ ok: false, msg: respuesta.error });
        } else {
            res.status(201).json({
                ok: true,
                msg: 'Actualizando consignatario y plantilla',
            });
        }
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/consignatariosJoinAll/', async (req, res) => {
    try {
        const consignatarios = req.body as any[];
        const respuesta = await deleteConsignatarioJoinAll(consignatarios);
        //si respuesta contiene error, contexto de posible retorno {error: 'mensaje de error'}
        if (respuesta?.error) {
            res.status(400).json({ ok: false, msg: respuesta.error });
        } else {
            res.status(201).json({
                ok: true,
                msg: 'Eliminando consignatario y plantilla',
            });
        }
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;

