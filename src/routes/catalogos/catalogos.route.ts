import express from 'express';
import { getCatalogoModo, getCatalogoModos } from '@services/catalogos/aerolineas/catalogo_modo_aerolinea.servicio';
import { getCatalogoMultiplicador, getCatalogoMultiplicadores } from '@services/catalogos/aerolineas/catalogo_mult_aerolinea.servicio';
import { getCatalogoProductoOpciones, getCatalogoProductosOpciones } from '@services/catalogos/productos/catalogo_productos_opciones.servicio';
import { getCatalogoProductoUnidad, getCatalogoProductosUnidad } from '@services/catalogos/productos/catalogo_productos_unidad.servicio';
import { getTiposCarga } from '@services/catalogos/tipos_embarque/tipos_carga.servicio';
import { getTiposEmbalaje } from '@services/catalogos/tipos_embarque/tipos_embajale.servicio';
import { getTiposDocumento } from '@services/catalogos/consignatario/consignatario_tipo_documento.servicio';

const router = express.Router();

router.get('/aerolineas/modo', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getCatalogoModo(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getCatalogoModos());
        }
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.get('/aerolineas/multiplicador', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getCatalogoMultiplicador(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getCatalogoMultiplicadores());
        }
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.get('/productos/opciones', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getCatalogoProductoOpciones(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getCatalogoProductosOpciones());
        }
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.get('/productos/unidad', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getCatalogoProductoUnidad(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getCatalogoProductosUnidad());
        }
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.get('/tipos-embarque/carga', async (req, res) => {
    try {
        res.send(await getTiposCarga());
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.get('/tipos-embarque/embalaje', async (req, res) => {
    try {
        res.send(await getTiposEmbalaje());
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.get('/tipo-documento', async (req, res) => {
    try {
        res.send(await getTiposDocumento());
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});



export default router;

