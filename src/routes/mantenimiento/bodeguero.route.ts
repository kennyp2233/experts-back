import { Router, Request, Response, NextFunction } from 'express';
import { query, body } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';

import { getBodeguero, createBodeguero, deleteBodegueros, getBodegueros, updateBodeguero } from '@services/mantenimiento/bodegueros.servicio';

import { Bodeguero, BodegueroAtributosCreacion } from '@typesApp/mantenimiento/bodegueros.type';

const router = Router();

// Obtener bodegueros
router.get('/',
    [
        query('id').optional().isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.query.id ? Number.parseInt(req.query.id as string) : undefined;
            const response = id ? await getBodeguero(id) : await getBodegueros();
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

// Crear bodeguero
router.post('/',
    [
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await createBodeguero(req.body as BodegueroAtributosCreacion);
            res.status(201).json({ ok: true, msg: 'Creando bodeguero' });
        } catch (error) {
            next(error);
        }
    }
);

// Actualizar bodeguero
router.put('/',
    [
        body('id_bodeguero').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateBodeguero(req.body as Bodeguero);
            res.status(200).json({ ok: true, msg: 'Actualizando bodeguero' });
        } catch (error) {
            next(error);
        }
    }
);

// Eliminar bodegueros
router.delete('/',
    [
        body().isArray().withMessage('Los IDs deben ser un arreglo de números enteros positivos'),

    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await deleteBodegueros(req.body);
            res.status(200).json({ ok: true, msg: 'Eliminando bodegueros' });
        } catch (error) {
            next(error);
        }
    }
);

export default router;
