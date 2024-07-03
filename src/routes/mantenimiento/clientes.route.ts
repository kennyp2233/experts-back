import express from 'express';
import { createCliente, deleteClientes, getCliente, getClientes, updateCliente } from '@services/mantenimiento/clientes.servicio';

const router = express.Router();

router.get('/clientes', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await getCliente(Number.parseInt(req.query.id as string)));
        } else {
            res.send(await getClientes());
        }

    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post('/clientes', async (req, res) => {
    try {
        const resultado = await createCliente(req.body);
        res.status(201).json({ ok: true, msg: 'Cliente creado', resultado });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/clientes', async (req, res) => {
    try {
        await updateCliente(req.body);
        res.status(200).json({ ok: true, msg: 'Cliente actualizado' });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete('/clientes', async (req, res) => {
    try {
        if (req.query.id) {
            res.send(await deleteClientes([Number.parseInt(req.query.id as string)]));
        } else {
            res.send(await deleteClientes(req.body));
        }
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});