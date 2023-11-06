"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aerolineasServicio_1 = __importDefault(require("../services/aerolineasServicio"));
const router = express_1.default.Router();
const aero = new aerolineasServicio_1.default();
router.get('/aerolineas', (_, res) => {
    res.send('Obteniendo aerolineas');
});
/*
router.get('/aerolineas', (_, res) => {
    res.send('Obteniendo aerolineas');
});
*/
router.post('/aerolineas', (_, res) => {
    const aerolineaNew = {
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
    };
    aero.createAerolinea(aerolineaNew);
    res.status(201).json({
        ok: true,
        msg: 'Creando aerolinea',
        status: 201
    });
});
router.put('/aerolineas', (_, res) => {
    res.send('Creando aerolinea');
});
router.delete('/aerolineas', (_, res) => {
    res.send('Creando aerolinea');
});
exports.default = router;
