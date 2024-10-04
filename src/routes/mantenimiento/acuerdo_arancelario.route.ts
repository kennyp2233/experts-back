import { Router, Request, Response, NextFunction } from 'express';
import { query, body } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';
import { createAcuerdoArancelario, getAcuerdoArancelario, getAcuerdosArancelarios } from '@services/mantenimiento/acuerdos_arancelarios.servicio';
import { AcuerdoArancelarioAtributosCreacion } from '@typesApp/mantenimiento/acuerdo_arancelario.type';

const router = Router();

// Obtener acuerdos arancelarios
router.get('/',
    [
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.query.id) {
                const acuerdo = await getAcuerdoArancelario(Number(req.query.id));
                res.json(acuerdo);
            } else {
                const acuerdos = await getAcuerdosArancelarios();
                res.json(acuerdos);
            }
        } catch (error) {
            next(error);
        }
    }
);

// Crear acuerdo arancelario
router.post('/',
    [
        // Añade más validaciones según la estructura de AcuerdoArancelarioAtributosCreacion
    ],
    validationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await createAcuerdoArancelario(req.body as AcuerdoArancelarioAtributosCreacion);
            res.status(201).json({ message: 'Acuerdo arancelario creado con éxito' });
        } catch (error) {
            next(error);
        }
    }
);

export default router;
