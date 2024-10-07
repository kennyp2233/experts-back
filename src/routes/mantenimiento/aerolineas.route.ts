import express, { Request, Response, NextFunction } from 'express';
import { body, query } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';
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
import { Aerolinea, AerolineaCreationAttributes } from '@typesApp/mantenimiento/aerolinea.type';

const router = express.Router();

// GET /aerolineas
router.get('/',
    [
        query('id').optional().isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.query.id ? Number.parseInt(req.query.id as string) : undefined;
            const response = id ? await getAerolinea(id) : await getAerolineas();
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

// POST /aerolineas
router.post('/',
    [
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await createAerolinea(req.body as AerolineaCreationAttributes);
            res.status(201).json({ ok: true, msg: 'Creando aerolinea' });
        } catch (error) {
            next(error);
        }
    }
);

// POST /aerolineas/joinAll
router.post('/joinAll',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            await createAerolineaAndPlantilla(data);
            res.status(201).json({ ok: true, msg: 'Creando aerolinea y plantilla' });
        } catch (error) {
            next(error);
        }
    }
);

// PUT /aerolineas
router.put('/',
    [
        body('id_aerolinea').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
        // Añadir más validaciones según sea necesario
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateAerolinea(req.body as Aerolinea);
            res.status(200).json({ ok: true, msg: 'Actualizando aerolinea' });
        } catch (error) {
            next(error);
        }
    }
);

// PUT /aerolineas/joinAll
router.put('/joinAll',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateAerolineaAndPlantilla(req.body as any);
            res.status(201).json({ ok: true, msg: 'Actualizando aerolinea y plantilla' });
        } catch (error) {
            next(error);
        }
    }
);

// DELETE /aerolineas
router.delete('/',
    [
        body('aerolineas').isArray().withMessage('El cuerpo debe ser un array de IDs').custom(arr => arr.every((id: any) => typeof id === 'number'))
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const aerolineas = req.body as number[];
            await deleteAerolineas(aerolineas);
            res.status(200).json({ ok: true, msg: 'Eliminando aerolinea' });
        } catch (error) {
            next(error);
        }
    }
);

// DELETE /aerolineas/joinAll
router.delete('/joinAll',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const aerolineas = req.body as number[];
            await deleteAerolineaAndPlantilla(aerolineas);
            res.status(200).json({ ok: true, msg: 'Eliminando aerolinea y plantilla' });
        } catch (error) {
            next(error);
        }
    }
);

// GET /aerolineas/joinAll
router.get('/joinAll',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await aerolineaJoinAll();
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
