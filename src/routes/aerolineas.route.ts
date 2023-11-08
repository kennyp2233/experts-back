import express from 'express';
import aerolinea from '../services/aerolineas.servicio';
import { AerolineaCreationAttributesI } from '../../type';


const router = express.Router();
const aero = new aerolinea();

router.get('/aerolineas', async (_, res) => {
    res.send(await aero.getAerolineas());
});
/*
router.get('/aerolineas', (_, res) => {
    res.send('Obteniendo aerolineas');
});
*/
router.post('/aerolineas', async (req, res) => {
    const aerolineaNew: AerolineaCreationAttributesI = {
        alias: 'alias',
        nombre: 'nombre',
        ci_ruc: 'ci_ruc',
        direccion: 'direccion',
        telefono: 'telefono',
        email: 'email',
        ciudad: 'ciudad',
        pais: 'pais',
        contacto: 'contacto',
        modo: 'modo',
        maestra_guias_hijas: true,
        codigo: 'codigo',
        prefijo_awb: 'prefijo_awb',
        codigo_cae: 'codigo_cae',
        estado_activo: true
    }
    try {
        console.log(req.body);
        aero.createAerolinea(req.body);
        res.status(201).json({
            ok: true,
            msg: 'Creando aerolinea',
            status: 201
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
            status: 500
        });
    }

});

router.put('/aerolineas', (_, res) => {
    res.send('Creando aerolinea');
});

router.delete('/aerolineas', (_, res) => {
    res.send('Creando aerolinea');
});

export default router;