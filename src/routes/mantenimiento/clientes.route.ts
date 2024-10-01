import express, { Request, Response, NextFunction } from 'express';
import { body, query } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';
import { createCliente, deleteClientes, getCliente, getClientes, updateCliente } from '@services/mantenimiento/clientes.servicio';

const router = express.Router();

// GET /clientes
router.get('/clientes',
    [
        query('id').optional().isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.query.id ? Number.parseInt(req.query.id as string) : undefined;
            const result = id ? await getCliente(id) : await getClientes();
            res.json(result);
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// POST /clientes
router.post('/clientes',
    [
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resultado = await createCliente(req.body);
            res.status(201).json({ ok: true, msg: 'Cliente creado', resultado });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// PUT /clientes
router.put('/clientes',
    [
        body('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
        // Añadir más validaciones según los campos necesarios para la actualización
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateCliente(req.body);
            res.status(200).json({ ok: true, msg: 'Cliente actualizado' });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// DELETE /clientes
router.delete('/clientes',
    [
        query('id').optional().isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
        body('ids').optional().isArray().withMessage('El cuerpo debe ser un array de IDs'),
        body('ids.*').optional().isInt({ min: 1 }).withMessage('Cada ID debe ser un número entero positivo'),
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ids = req.query.id ? [Number.parseInt(req.query.id as string)] : req.body.ids;
            await deleteClientes(ids);
            res.status(200).json({ ok: true, msg: 'Clientes eliminados' });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

export default router;
