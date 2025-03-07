import { Router, Request, Response, NextFunction } from 'express';
import { query, body } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';

import { getSubAgencia, getSubAgencias, createSubAgencia, deleteSubAgencias, updateSubAgencia } from '@services/mantenimiento/subagencias.servicio';

import { SubAgencia, SubAgenciaAtributosCreacion } from '@typesApp/mantenimiento/subagencia.type';

const router = Router();

// GET /subagencias

router.get('/',
    [
        query('id').optional().isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.query.id ? Number.parseInt(req.query.id as string) : undefined;
            const response = id ? await getSubAgencia(id) : await getSubAgencias();
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

// POST /subagencias

router.post('/',
    [
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await createSubAgencia(req.body as SubAgenciaAtributosCreacion);
            res.status(201).json({ ok: true, msg: 'Creando subagencia' });
        } catch (error) {
            next(error);
        }
    }
);


// PUT /subagencias

router.put('/',
    [
        body('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateSubAgencia(req.body as SubAgencia);
            res.status(200).json({ ok: true, msg: 'Actualizando subagencia' });
        } catch (error) {
            next(error);
        }
    }
);

// DELETE /subagencias

router.delete('/',
    [
        body('').isArray().withMessage('Los IDs deben ser un arreglo de números enteros positivos'),
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await deleteSubAgencias(req.body as number[]);
            res.status(200).json({ ok: true, msg: 'Eliminando subagencias' });
        } catch (error) {
            next(error);
        }
    }
);

export default router;