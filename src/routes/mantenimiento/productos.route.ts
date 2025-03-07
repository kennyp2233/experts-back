import express, { Request, Response, NextFunction } from 'express';
import {
    createProducto,
    getProducto,
    getProductos,
    updateProducto,
    deleteProductos,
    getProductoJoinAll
} from '@services/mantenimiento/productos.servicio';

const router = express.Router();

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.query.id) {
                res.send(await getProducto(Number.parseInt(req.query.id as string)));
            } else {
                res.send(await getProductos());
            }
        } catch (error: any) {
            next(error);
        }
    });

router.get('/productosJoinAll',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send(await getProductoJoinAll());
        } catch (error: any) {
            next(error);
        }
    });


router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
            const producto = await createProducto(req.body);
            res.status(201).json({ ok: true, msg: 'Producto creado', producto });
        } catch (error: any) {
            next(error);
        }
    });

router.put('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await updateProducto(req.body);
            res.status(200).json({ ok: true, msg: 'Producto actualizado' });
        } catch (error: any) {
            next(error);
        }
    });

router.delete('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productos = req.body as any[];
            await deleteProductos(productos.map(Number));
            res.status(200).json({ ok: true, msg: 'Producto eliminado' });
        } catch (error: any) {
            next(error);
        }
    });

export default router;