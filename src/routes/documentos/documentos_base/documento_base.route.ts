import validationMiddleware from '@middlewares/validationMiddleware';
import { getGuiasBase, crearDocumentoYGuias, previewDocumentoBaseYGuias, getDocumentoBase, updateDocumentoBase } from '@services/documentos/documentos_base/documento_base.servicio';
import { Router } from 'express';
import { body, query } from 'express-validator';

const router = Router();

router.get('/',
    [
        query('id').optional().isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
        query('page').optional().isInt({ min: 1 }).withMessage('La página debe ser un número entero positivo'),
        query('limit').optional().isInt({ min: 1 }).withMessage('El límite debe ser un número entero positivo'),

    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const id = req.query.id ? Number.parseInt(req.query.id as string) : undefined;
            const page = req.query.page ? Number.parseInt(req.query.page as string) : undefined;
            const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;
            const response = id ? await getDocumentoBase(id) : await getGuiasBase(page, limit);
            res.json(response);
        } catch (error: any) {
            next(error);
        }
    }
);

router.post('/',
    [
        body('documento_base').isObject().withMessage('El documento base debe ser un objeto'),
        body('n_guias').isInt({ min: 1 }).withMessage('El número de guías debe ser un número entero positivo'),
        body('secuencial_inicial').isInt({ min: 1 }).withMessage('El secuencial inicial debe ser un número entero positivo'),
        body('prefijo').isInt().withMessage('El prefijo debe ser una cadena de texto'),
    ],

    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            await crearDocumentoYGuias(req.body.documento_base, req.body.n_guias, req.body.secuencial_inicial, req.body.prefijo);
            res.status(201).json({ ok: true, msg: 'Creando documento base' });
        } catch (error: any) {
            next(error);
        }
    }
);

router.post('/preview',
    [
        body('documento_base').isObject().withMessage('El documento base debe ser un objeto'),
        body('n_guias').isInt({ min: 1 }).withMessage('El número de guías debe ser un número entero positivo'),
        body('secuencial_inicial').isInt({ min: 1 }).withMessage('El secuencial inicial debe ser un número entero positivo'),
        body('prefijo').isInt().withMessage('El prefijo debe ser una cadena de texto'),
    ],

    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const response = await previewDocumentoBaseYGuias(req.body.documento_base, req.body.n_guias, req.body.secuencial_inicial, req.body.prefijo);
            res.json(response);
        } catch (error: any) {
            next(error);
        }
    }
);

router.put('/',
    [
        body().isObject().withMessage('El documento base debe ser un objeto'),
    ],
    validationMiddleware,
    async (req: any, res: any, next: any) => {
        try {
            const documento_base = await updateDocumentoBase(req.body);
            if (documento_base) {
                res.json(documento_base);
            } else {
                res.status(404).json({ ok: false, msg: 'No se encontró el documento base' });
            }
        } catch (error: any) {
            next(error);
        }
    }
);

export default router;