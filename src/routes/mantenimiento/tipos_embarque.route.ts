import express, { Request, Response, NextFunction } from 'express';
import {
    createTipoEmbarque,
    updateTipoEmbarque,
    deleteTipoEmbarque,
    deleteTipoEmbarques,
    getTiposEmbarqueJoinAll,
    getTipoEmbarque
} from '@services/mantenimiento/tipos_embarque.servicio';

const router = express.Router();

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.query.id) {
                res.send(await getTipoEmbarque(Number.parseInt(req.query.id as string)));
            } else {
                res.send(await getTiposEmbarqueJoinAll());
            }
        } catch (error: any) {
            next(error);
        }
    });

router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
            const tipoEmbarque = await createTipoEmbarque(req.body);
            res.status(201).json({ ok: true, msg: 'Tipo de embarque creado', tipoEmbarque });
        } catch (error: any) {
            next(error);
        }
    });

router.put('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateTipoEmbarque(req.body);
            res.status(200).json({ ok: true, msg: 'Tipo de embarque actualizado' });
        } catch (error: any) {
            next(error);
        }
    });

router.delete('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tiposEmbarque = req.body as any[];
            await deleteTipoEmbarques(tiposEmbarque.map(Number));
            res.status(200).json({ ok: true, msg: 'Tipo de embarque eliminado' });
        } catch (error: any) {
            next(error);
        }
    });

router.delete('/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await deleteTipoEmbarque(Number.parseInt(req.params.id));
            res.status(200).json({ ok: true, msg: 'Tipo de embarque eliminado' });
        } catch (error: any) {
            next(error);
        }
    });

export default router;