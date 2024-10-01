import express, { Request, Response, NextFunction } from 'express';
import { getFincasJoinAll, createFincaWithAllData, deleteFincas, updateFincaWithAllData } from '@services/mantenimiento/fincas.servicio';
import { Finca } from '@typesApp/mantenimiento/finca.type';

const router = express.Router();

router.get('/fincasJoinAll',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send(await getFincasJoinAll());
        }
        catch (error: any) {
            next(error);
        }
    });

router.post('/fincas',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await createFincaWithAllData(req.body as Finca);
            res.status(201).json({
                ok: true,
                msg: 'Creando finca',
            });
        }
        catch (error: any) {
            next(error);
        }
    });

router.put('/fincas',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateFincaWithAllData(req.body as Finca);
            res.status(201).json({
                ok: true,
                msg: 'Actualizando finca',
            });
        }
        catch (error: any) {
            next(error);
        }
    });

router.delete('/fincas',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await deleteFincas(req.body);
            res.status(200).json({
                ok: true,
                msg: 'Borrando fincas',
            });
        }
        catch (error: any) {
            next(error);
        }
    });

export default router;