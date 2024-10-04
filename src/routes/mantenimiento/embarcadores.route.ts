import express, { Request, Response, NextFunction } from 'express';

import { createEmbarcador, deleteEmbarcadores, getEmbarcador, getEmbarcadores, updateEmbarcador } from '@services/mantenimiento/embarcadores.servicio';
import { Embarcador, EmbarcadorAtributosCreacion } from '@typesApp/mantenimiento/embarcador.type';

const router = express.Router();

router.get('/',
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

router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const embarcador = await createEmbarcador(req.body as EmbarcadorAtributosCreacion);
            res.status(201).json({ ok: true, msg: 'Embarcador creado', embarcador });
        } catch (error: any) {
            next(error);
        }
    });

router.put('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateEmbarcador(req.body as Embarcador);
            res.status(200).json({ ok: true, msg: 'Embarcador actualizado' });
        } catch (error: any) {
            next(error);
        }
    });

router.delete('/',
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
