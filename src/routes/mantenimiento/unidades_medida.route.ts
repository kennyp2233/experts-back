import express from 'express';
import {
    createCatalogoProductoUnidad,
    getCatalogoProductoUnidad,
    getCatalogoProductosUnidad,
    updateCatalogoProductoUnidad,
    deleteCatalogoProductosUnidad
} from '@services/catalogos/productos/catalogo_productos_unidad.servicio';

const router = express.Router();

router.get('/unidadesMedida', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getCatalogoProductoUnidad(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getCatalogoProductosUnidad());
        }
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/unidadesMedida', async (req, res) => {
    try {
        console.log(req.body);
        const producto = await createCatalogoProductoUnidad(req.body);
        res.status(201).json({ ok: true, msg: 'Producto creado', producto });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/unidadesMedida', async (req, res) => {
    try {
        await updateCatalogoProductoUnidad(req.body);
        res.status(200).json({ ok: true, msg: 'Producto actualizado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/unidadesMedida', async (req, res) => {
    try {
        const productos = req.body as any[];
        await deleteCatalogoProductosUnidad(productos.map(Number));
        res.status(200).json({ ok: true, msg: 'Producto eliminado' });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;