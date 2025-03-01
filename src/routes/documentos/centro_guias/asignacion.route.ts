import { Router } from 'express';
import validationMiddleware from '@middlewares/validationMiddleware';
import { body, query, param } from 'express-validator';
import {
    getDocumentosCoordinacion,
    createDocumentoCoordinacion,
    updateDocumentoCoordinacion,
    deleteDocumentoCoordinacion,
    getAvailableAerolineas,
    
} from '@services/documentos/centro_guias/documento_coordinacion.servicio';

const router = Router();

// Obtener documentos de coordinación con paginación
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
            const response = await getDocumentosCoordinacion(page, limit);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

// Crear un nuevo documento de coordinación
router.post('/',
    [
        body('id_guia_madre')
            .isInt({ min: 1 }).withMessage('El ID de la Guía Madre debe ser un número entero positivo'),

        body('id_clientes')
            .optional().isArray().withMessage('Los clientes deben enviarse como un array'),

        body('id_clientes.*')
            .optional().isInt({ min: 1 }).withMessage('Cada cliente debe ser un número entero positivo'),

        body().isObject().withMessage('El cuerpo de la solicitud debe ser un objeto válido')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const documento = await createDocumentoCoordinacion(req.body);
            res.status(201).json(documento);
        } catch (error) {
            next(error);
        }
    }
);

// Actualizar un documento de coordinación
router.put('/:id',
    [
        param('id')
            .isInt({ min: 1 }).withMessage('El ID del documento debe ser un número entero positivo'),

        body('id_guia_madre')
            .isInt({ min: 1 }).withMessage('El ID de la Guía Madre debe ser un número entero positivo'),

        body('id_clientes')
            .optional().isArray().withMessage('Los clientes deben enviarse como un array'),

        body('id_clientes.*')
            .optional().isInt({ min: 1 }).withMessage('Cada cliente debe ser un número entero positivo'),

        body().isObject().withMessage('El cuerpo de la solicitud debe ser un objeto válido')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const id = Number(req.params.id);
            const documento = await updateDocumentoCoordinacion(id, req.body);
            res.json(documento);
        } catch (error) {
            next(error);
        }
    }
);

// Eliminar un documento de coordinación
router.delete('/:id',
    [
        param('id')
            .isInt({ min: 1 }).withMessage('El ID del documento debe ser un número entero positivo')
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const id = Number(req.params.id);
            const documento = await deleteDocumentoCoordinacion(id);
            res.json({ message: 'Documento de coordinación eliminado', documento });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/aerolineas', async (req: any, res: any, next: any) => {
    try {
        const aerolineas = await getAvailableAerolineas();
        res.json(aerolineas);
    } catch (error) {
        next(error);
    }
});

export default router;
