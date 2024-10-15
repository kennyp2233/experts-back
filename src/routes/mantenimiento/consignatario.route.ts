import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';
import { getConsignatariosJoinAll, createConsignatarioJoinAll, updateConsignatarioJoinAll, deleteConsignatarioJoinAll } from '@services/mantenimiento/consignatario/consignatario.servicio';

const router = express.Router();

// GET /consignatariosJoinAll
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consignatarios = await getConsignatariosJoinAll();
        res.json(consignatarios);
    } catch (error) {
        next(error); // Todos los errores deben ser manejados por el middleware global
    }
});

// POST /consignatariosJoinAll
router.post('/',
    [
        // Añadir más validaciones según la estructura esperada del cuerpo de la solicitud
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const respuesta = await createConsignatarioJoinAll(req.body);
            res.status(201).json({ ok: true, msg: 'Consignatario y plantilla creados con éxito' });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// PUT /consignatariosJoinAll
router.put('/',
    [
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const respuesta = await updateConsignatarioJoinAll(req.body);
            res.status(200).json({ ok: true, msg: 'Consignatario y plantilla actualizados con éxito' });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// DELETE /consignatariosJoinAll
router.delete('/',
    [
        body('').optional().isArray().withMessage('El cuerpo debe ser un array de IDs'),
        ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const respuesta = await deleteConsignatarioJoinAll(req.body);
            res.status(200).json({ ok: true, msg: 'Consignatarios y plantilla eliminados con éxito' });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

export default router;
