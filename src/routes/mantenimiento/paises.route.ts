import express, { Request, Response, NextFunction } from 'express';
import { createPais, deletePais, getPais, getPaises, updatePais, deletePaises } from '@services/mantenimiento/paises.servicio';
import { Pais, PaisAtributosCreacion } from '@typesApp/mantenimiento/pais.type';

const router = express.Router();

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.query.id) {
                res.send(await getPais(Number.parseInt(req.query.id as string)));
            } else {
                res.send(await getPaises());
            }
        } catch (error: any) {
            next(error);
        }
    });



router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pais = await createPais(req.body);
            res.status(201).json({ ok: true, msg: 'Pais creado', pais });
        } catch (error: any) {
            next(error);
        }
    });

router.put('/',
    async (req: Request, res: Response, next: NextFunction) => {

        try {
            //haz el update con la funcion updatePais(req.body as Pais);
            await updatePais(req.body as Pais);
            res.status(200).json({ ok: true, msg: 'Pais actualizado' });
        } catch (error: any) {
            next(error);
        }
    });

router.delete('/',
    async (req: Request, res: Response, next: NextFunction) => {

        try {
            const paises = req.body as any[];
            await deletePaises(paises.map(Number));
            res.status(200).json({ ok: true, msg: 'Pais eliminado' });
        } catch (error: any) {
            next(error);
        }
    });


export default router;