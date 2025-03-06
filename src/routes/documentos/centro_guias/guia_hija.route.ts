// src/routes/documentos/centro_guias/guia_hija.route.ts

import { Router } from 'express';
import validationMiddleware from '@middlewares/validationMiddleware';
import { body, query, param } from 'express-validator';
import {
    asignarGuiaHija,
    getGuiaHija,
    getGuiasHijas,
    getGuiasHijasPorFinca,
    getGuiasHijasPorGuiaMadre,
    obtenerGuiaHijaPorFincaYGuiaMadre
} from '@services/documentos/centro_guias/guia_hija.servicio';

const router = Router();

// Obtener todas las guías hijas con paginación
router.get('/',
    [
        query('page').optional().isInt({ min: 1 }).withMessage('La página debe ser un número entero positivo'),
        query('limit').optional().isInt({ min: 1 }).withMessage('El límite debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const page = req.query.page ? Number.parseInt(req.query.page as string) : 1;
            const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 10;
            const response = await getGuiasHijas(page, limit);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

// Obtener una guía hija por ID
router.get('/:id',
    [
        param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const id = Number.parseInt(req.params.id);
            const guiaHija = await getGuiaHija(id);

            if (!guiaHija) {
                return res.status(404).json({ message: 'Guía hija no encontrada' });
            }

            res.json(guiaHija);
        } catch (error) {
            next(error);
        }
    }
);

// Obtener guías hijas por guía madre
router.get('/guia-madre/:id',
    [
        param('id').isInt({ min: 1 }).withMessage('El ID de la guía madre debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const id_guia_madre = Number.parseInt(req.params.id);
            const guiasHijas = await getGuiasHijasPorGuiaMadre(id_guia_madre);
            res.json(guiasHijas);
        } catch (error) {
            next(error);
        }
    }
);

// Obtener guías hijas por finca
router.get('/finca/:id',
    [
        param('id').isInt({ min: 1 }).withMessage('El ID de la finca debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const id_finca = Number.parseInt(req.params.id);
            const guiasHijas = await getGuiasHijasPorFinca(id_finca);
            res.json(guiasHijas);
        } catch (error) {
            next(error);
        }
    }
);

// Verificar si existe una guía hija para una finca y guía madre
router.get('/verificar/:id_finca/:id_guia_madre',
    [
        param('id_finca').isInt({ min: 1 }).withMessage('El ID de la finca debe ser un número entero positivo'),
        param('id_guia_madre').isInt({ min: 1 }).withMessage('El ID de la guía madre debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const id_finca = Number.parseInt(req.params.id_finca);
            const id_guia_madre = Number.parseInt(req.params.id_guia_madre);

            const guiaHija = await obtenerGuiaHijaPorFincaYGuiaMadre(id_finca, id_guia_madre);

            if (!guiaHija) {
                return res.status(404).json({ exists: false, message: 'No existe guía hija para esta combinación' });
            }

            res.json({ exists: true, guiaHija });
        } catch (error) {
            next(error);
        }
    }
);

// Asignar una guía hija
router.post('/asignar',
    [
        body('id_documento_coordinacion').isInt({ min: 1 }).withMessage('El ID del documento de coordinación debe ser un número entero positivo'),
        body('id_finca').isInt({ min: 1 }).withMessage('El ID de la finca debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const { id_documento_coordinacion, id_finca } = req.body;

            const guiaHija = await asignarGuiaHija(id_documento_coordinacion, id_finca);
            res.status(201).json(guiaHija);
        } catch (error) {
            next(error);
        }
    }
);

export default router;