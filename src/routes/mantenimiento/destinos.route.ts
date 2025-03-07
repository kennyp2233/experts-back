import express, { Request, Response, NextFunction } from 'express';
import { body, query } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';
import { createDestino, getDestino, getDestinos, updateDestino, deleteDestinos, getDestinosJoinPais } from '@services/mantenimiento/destinos.servicio';
import { Destino, DestinoAtributosCreacion } from '@typesApp/mantenimiento/destino.type';

const router = express.Router();

// GET /destinos
router.get('/',
    [
        query('id_destino').optional().isInt().withMessage('ID debe ser un número entero'),
        // Agregar más validaciones si es necesario
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.query.id) {
                const destino = await getDestino(Number.parseInt(req.query.id as string));
                res.json(destino);
            } else {
                const destinos = await getDestinos();
                res.json(destinos);
            }
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// GET /destinos/paises
router.get('/paises', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const destinosPaises = await getDestinosJoinPais();
        res.json(destinosPaises);
    } catch (error) {
        next(error); // Todos los errores deben ser manejados por el middleware global
    }
});

// POST /destinos
router.post('/',
    [
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await createDestino(req.body as DestinoAtributosCreacion);
            res.status(201).json({ ok: true, msg: 'Destino creado' });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// PUT /destinos
router.put('/',
    [
        body('id_destino').isInt().withMessage('ID debe ser un número entero'),
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateDestino(req.body as Destino);
            res.status(200).json({ ok: true, msg: 'Destino actualizado' });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

// DELETE /destinos
router.delete('/',
    [
        body('').isArray().withMessage('El cuerpo debe ser un array de destinos'),
        // Agregar más validaciones si es necesario
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const destinos = req.body as number[];
            await deleteDestinos(destinos);
            res.status(200).json({ ok: true, msg: 'Destinos eliminados' });
        } catch (error) {
            next(error); // Todos los errores deben ser manejados por el middleware global
        }
    }
);

export default router;
