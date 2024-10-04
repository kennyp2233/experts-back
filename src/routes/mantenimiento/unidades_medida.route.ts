import express, { Request, Response, NextFunction } from 'express';
import {
    createCatalogoProductoUnidad,
    getCatalogoProductoUnidad,
    getCatalogoProductosUnidad,
    updateCatalogoProductoUnidad,
    deleteCatalogoProductosUnidad
} from '@services/catalogos/productos/catalogo_productos_unidad.servicio';

const router = express.Router();

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.query.id) {
                res.send(await getCatalogoProductoUnidad(Number.parseInt(req.query.id as string)));
            } else {
                res.send(await getCatalogoProductosUnidad());
            }
        } catch (error: any) {
            next(error);
        }
    });

router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
            const producto = await createCatalogoProductoUnidad(req.body);
            res.status(201).json({ ok: true, msg: 'Producto creado', producto });
        } catch (error: any) {
            next(error);
        }
    });

router.put('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateCatalogoProductoUnidad(req.body);
            res.status(200).json({ ok: true, msg: 'Producto actualizado' });
        } catch (error: any) {
            next(error);
        }
    });

router.delete('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productos = req.body as any[];
            await deleteCatalogoProductosUnidad(productos.map(Number));
            res.status(200).json({ ok: true, msg: 'Producto eliminado' });
        } catch (error: any) {
            next(error);
        }
    });

export default router;