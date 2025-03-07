import { Router } from 'express';
import validationMiddleware from '@middlewares/validationMiddleware';
import { body, query, param } from 'express-validator';

import {
    getGuiasMadre,
    getGuiaMadre,
    createGuiaMadre,
    updateGuiaMadre,
    getGuiaMadreByAirlineId
} from '@services/documentos/documentos_base/guia_madre.servicio';

const router = Router();

// Obtener guías madre
router.get('/',
    async (req: any, res: any, next: any) => {
        try {
            const guiasMadre = await getGuiasMadre();
            res.json(guiasMadre);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/aerolinea/:id?',
    [
        query('id')
            .optional()
            .isInt({ min: 1 }).withMessage('El ID de la aerolínea debe ser un número entero positivo'),
        param('id')
            .optional()
            .isInt({ min: 1 }).withMessage('El ID de la aerolínea debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const idAerolinea = req.params.id || req.query.id; // ✅ Soporta ambos casos


            if (!idAerolinea) {
                return res.status(400).json({ message: 'Debe proporcionar un ID de aerolínea válido' });
            }

            const guiaMadre = await getGuiaMadreByAirlineId(Number.parseInt(idAerolinea));

            if (guiaMadre) {
                res.json(guiaMadre);
            } else {
                res.status(404).json({ message: 'Guía Madre no encontrada' });
            }
        } catch (error) {
            next(error);
        }
    }
);

// Obtener guía madre por ID
router.get('/:id',
    [
        param('id')
            .isInt({ min: 1 }).withMessage('El ID de la Guía Madre debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const guiaMadre = await getGuiaMadre(Number.parseInt(req.params.id));
            if (guiaMadre) {
                res.json(guiaMadre);
            } else {
                res.status(404).json({ message: 'Guía Madre no encontrada' });
            }
        } catch (error) {
            next(error);
        }
    }
);

// Obtener guía madre por ID de aerolínea



// Crear una guía madre
router.post('/',
    [
        body('nombre')
            .isString().withMessage('El nombre de la Guía Madre debe ser una cadena de texto')
            .isLength({ min: 1 }).withMessage('El nombre de la Guía Madre no puede estar vacío'),

        body().isObject().withMessage('El cuerpo de la solicitud debe ser un objeto válido')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const guiaMadre = await createGuiaMadre(req.body);
            res.status(201).json(guiaMadre);
        } catch (error) {
            next(error);
        }
    }
);

// Actualizar una guía madre
router.put('/:id',
    [
        param('id')
            .isInt({ min: 1 }).withMessage('El ID de la Guía Madre debe ser un número entero positivo'),

        body('nombre')
            .isString().withMessage('El nombre de la Guía Madre debe ser una cadena de texto')
            .isLength({ min: 1 }).withMessage('El nombre de la Guía Madre no puede estar vacío'),

        body().isObject().withMessage('El cuerpo de la solicitud debe ser un objeto válido')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const guiaMadre = await updateGuiaMadre({ id: Number.parseInt(req.params.id), ...req.body });
            if (guiaMadre) {
                res.json(guiaMadre);
            } else {
                res.status(404).json({ message: 'Guía Madre no encontrada' });
            }
        } catch (error) {
            next(error);
        }
    }
);

export default router;