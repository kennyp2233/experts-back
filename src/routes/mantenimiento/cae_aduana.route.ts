import express, { Request, Response, NextFunction } from 'express';
import { body, query } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';
import {
    createAduana,
    deleteAduana,
    getAduana,
    getAduanas,
    updateAduana,
    deleteAduanas
} from '@services/mantenimiento/cae_aduana.servicio';
import { CaeAduanaAtributosCreacion, CaeAduana } from '@typesApp/mantenimiento/cae_aduana.type';

const router = express.Router();

// GET /aduanas
router.get('/',
    [
        query('id').optional().isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.query.id ? Number.parseInt(req.query.id as string) : undefined;
            const response = id ? await getAduana(id) : await getAduanas();
            res.json(response);
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// POST /aduanas
router.post('/',
    [
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resultado = await createAduana(req.body as CaeAduanaAtributosCreacion);
            res.status(201).json({ ok: true, msg: 'Aduana creada', resultado });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// PUT /aduanas
router.put('/',
    [
        body('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
        // Añadir más validaciones según sea necesario
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateAduana(req.body as CaeAduana);
            res.status(200).json({ ok: true, msg: 'Aduana actualizada' });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// DELETE /aduanas
router.delete('/',
    [
        query('id').optional().isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
        body().optional().isArray({ min: 1 }).withMessage('Debe enviar un arreglo de IDs'),
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.query.id ? Number.parseInt(req.query.id as string) : undefined;
            if (id !== undefined) {
                await deleteAduana(id);
                res.json({ ok: true, msg: 'Aduana eliminada' });
            } else {
                await deleteAduanas(req.body as number[]);
                res.json({ ok: true, msg: 'Aduanas eliminadas' });
            }
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

export default router;
