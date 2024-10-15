import { Router, Request, Response, NextFunction } from 'express';
import { query, body } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';

import { getFuncionarioAgrocalidad, createFuncionarioAgrocalidad, deleteFuncionariosAgrocalidad, getFuncionariosAgrocalidad, updateFuncionarioAgrocalidad } from '@services/mantenimiento/funcionario_agrocalidad.servicio';

import { FuncionarioAgrocalidad, FuncionarioAgrocalidadAtributosCreacion } from '@typesApp/mantenimiento/funcionario_agrocalidad.type';

const router = Router();

// GET /funcionarios_agrocalidad

router.get('/',
    [
        query('id').optional().isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.query.id ? Number.parseInt(req.query.id as string) : undefined;
            const response = id ? await getFuncionarioAgrocalidad(id) : await getFuncionariosAgrocalidad();
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

// POST /funcionarios_agrocalidad

router.post('/',
    [
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await createFuncionarioAgrocalidad(req.body as FuncionarioAgrocalidadAtributosCreacion);
            res.status(201).json({ ok: true, msg: 'Creando funcionario de Agrocalidad' });
        } catch (error) {
            next(error);
        }
    }
);


// PUT /funcionarios_agrocalidad

router.put('/',
    [
        body('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateFuncionarioAgrocalidad(req.body as FuncionarioAgrocalidad);
            res.status(200).json({ ok: true, msg: 'Actualizando funcionario de Agrocalidad' });
        } catch (error) {
            next(error);
        }
    }
);

// DELETE /funcionarios_agrocalidad

router.delete('/',
    [
        body('').isArray().withMessage('Los IDs deben ser un arreglo de números enteros positivos'),
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await deleteFuncionariosAgrocalidad(req.body as number[]);
            res.status(200).json({ ok: true, msg: 'Eliminando funcionarios de Agrocalidad' });
        } catch (error) {
            next(error);
        }
    }
);

export default router;