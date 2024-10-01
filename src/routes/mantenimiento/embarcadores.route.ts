import express, { Request, Response, NextFunction } from 'express';

import { createEmbarcador, deleteEmbarcadores, getEmbarcador, getEmbarcadores, updateEmbarcador } from '@services/mantenimiento/embarcadores.servicio';
import { Embarcador, EmbarcadorAtributosCreacion } from '@typesApp/mantenimiento/embarcador.type';

const router = express.Router();

router.get('/embarcadores',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.query.id) {
                res.send(await getEmbarcador(Number.parseInt(req.query.id as string)));
            } else {
                res.send(await getEmbarcadores());
            }
        } catch (error: any) {
            next(error);
        }
    });

router.post('/embarcadores',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const embarcador = await createEmbarcador(req.body as EmbarcadorAtributosCreacion);
            res.status(201).json({ ok: true, msg: 'Embarcador creado', embarcador });
        } catch (error: any) {
            next(error);
        }
    });

router.put('/embarcadores',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateEmbarcador(req.body as Embarcador);
            res.status(200).json({ ok: true, msg: 'Embarcador actualizado' });
        } catch (error: any) {
            next(error);
        }
    });

router.delete('/embarcadores',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const embarcadores = req.body as any[];
            await deleteEmbarcadores(embarcadores.map(Number));
            res.status(200).json({ ok: true, msg: 'Embarcador eliminado' });
        } catch (error: any) {
            next(error);
        }
    });

export default router;
