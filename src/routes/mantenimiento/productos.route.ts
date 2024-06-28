import express from 'express';
import {
    createProducto,
    getProducto,
    getProductos,
    updateProducto,
    deleteProductos,
    getProductoJoinAll
} from '@services/mantenimiento/productos.servicio';

const router = express.Router();

router.get('/productos', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getProducto(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getProductos());
        }
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.get('/productosJoinAll', async (req, res) => {
    try {
        res.send(await getProductoJoinAll());
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});


router.post('/productos', async (req, res) => {
    try {
        console.log(req.body);
        const producto = await createProducto(req.body);
        res.status(201).json({ ok: true, msg: 'Producto creado', producto });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/productos', async (req, res) => {
    try {
        await updateProducto(req.body);
        res.status(200).json({ ok: true, msg: 'Producto actualizado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/productos', async (req, res) => {
    try {
        const productos = req.body as any[];
        await deleteProductos(productos.map(Number));
        res.status(200).json({ ok: true, msg: 'Producto eliminado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;