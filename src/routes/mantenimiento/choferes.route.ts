import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';
import { getChoferes, createChofer, updateChofer, deleteChoferes } from '@services/mantenimiento/choferes.servicio';
import { Chofer } from '@typesApp/mantenimiento/chofer.type';

const router = express.Router();

// GET /choferes
router.get('/choferes',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const choferes = await getChoferes();
            res.json(choferes);
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// POST /choferes
router.post('/choferes',
    [
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await createChofer(req.body as Chofer);
            res.status(201).json({
                ok: true,
                msg: 'Chofer creado',
            });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// PUT /choferes
router.put('/choferes',
    [
        body('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
        // Añadir más validaciones según sea necesario
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateChofer(req.body as Chofer);
            res.status(200).json({
                ok: true,
                msg: 'Chofer actualizado',
            });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// DELETE /choferes
router.delete('/choferes',
    [
        body('ids').isArray().withMessage('El cuerpo debe ser un array de IDs'),
        body('ids.*').isInt({ min: 1 }).withMessage('Cada ID debe ser un número entero positivo'),
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await deleteChoferes(req.body.ids);
            res.status(200).json({
                ok: true,
                msg: 'Choferes eliminados',
            });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

export default router;
