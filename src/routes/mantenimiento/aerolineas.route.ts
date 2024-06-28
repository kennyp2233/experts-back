import express from 'express';
import {
    createAerolinea,
    deleteAerolineas,
    getAerolinea,
    getAerolineas,
    updateAerolinea,
    aerolineaJoinAll,
    createAerolineaAndPlantilla,
    updateAerolineaAndPlantilla,
    deleteAerolineaAndPlantilla
} from '@services/mantenimiento/aerolineas.servicio';
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
        await createAerolinea(req.body as AerolineaCreationAttributes);
        res.status(201).json({
            ok: true,
            msg: 'Creando aerolinea',
        });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/aerolineas/joinAll', async (req, res) => {
    try {
        const data = req.body;
        const respuesta = await createAerolineaAndPlantilla(data);
        // si respuesta contiene error, contexto de posible retorno {error: 'mensaje de error'}
        if (respuesta.error) {
            res.status(400).json({ ok: false, msg: respuesta.error });
        } else {

            res.status(201).json({
                ok: true,
                msg: 'Creando aerolinea y plantilla',
            });
        }
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }

});


router.put('/aerolineas', async (req, res) => {
    try {
        await updateAerolinea(req.body as Aerolinea);
        res.status(200).json({
            ok: true,
            msg: 'Actualizando aerolinea',
        });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/aerolineas/joinAll', async (req, res) => {
    try {
        const respuesta = await updateAerolineaAndPlantilla(req.body as any);
        if (respuesta.error) {
            res.status(400).json({ ok: false, msg: respuesta.error });
        } else {

            res.status(201).json({
                ok: true,
                msg: 'Actualizando aerolinea y plantilla',
            });
        }

    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/aerolineas', async (req, res) => {
    try {
        const aerolineas = req.body as any[];
        await deleteAerolineas(aerolineas.map(Number));
        res.status(200).json({
            ok: true,
            msg: 'Eliminando aerolinea',
        });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/aerolineas/joinAll', async (req, res) => {
    try {
        const aerolineas = req.body as any[];

        const respuesta = await deleteAerolineaAndPlantilla(aerolineas.map(Number));
        if (respuesta.error) {
            res.status(400).json({ ok: false, msg: respuesta.error });
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Eliminando aerolinea y plantilla',
            });
        }
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