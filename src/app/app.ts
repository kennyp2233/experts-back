import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { expressjwt } from 'express-jwt';

import aerolineasRouter from '@routes/mantenimiento/aerolineas.route';
import paisesRouter from '@routes/mantenimiento/paises.route';
import origenesRouter from '@routes/mantenimiento/origenes.route';
import caeAduanaRouter from '@routes/mantenimiento/cae_aduana.route';
import auth from '@routes/usuarios/auth.route';
import acuerdosArancelariosRoute from "@routes/mantenimiento/acuerdo_arancelario.route"
import destinos from '@routes/mantenimiento/destinos.route';
import producto from '@routes/mantenimiento/productos.route';
import catalogos from '@routes/catalogos/catalogos.route';
import unidades_medida from '@routes/mantenimiento/unidades_medida.route';
import tipos_embarque from '@routes/mantenimiento/tipos_embarque.route';
import embarcadores from '@routes/mantenimiento/embarcadores.route';
import consignatario from '@routes/mantenimiento/consignatario.route';
import clientes from '@routes/mantenimiento/clientes.route';
import fincas from '@routes/mantenimiento/fincas.route';
import choferes from '@routes/mantenimiento/choferes.route';
const app = express();

const path = [
    '/api/v1/login',
    '/api/v1/register',
];

app.use(cors());

app.use(bodyParser.json());

app.use(expressjwt({ secret: process.env.SECRET_KEY || "", algorithms: ['HS256'] })
    .unless({ path: path }));

app.get('/', (_, res) => {
    res.send('Hello World!');
});



app.use('/api/v1',
    aerolineasRouter,
    paisesRouter,
    origenesRouter,
    caeAduanaRouter,
    auth,
    acuerdosArancelariosRoute,
    destinos,
    producto,
    catalogos,
    unidades_medida,
    tipos_embarque,
    embarcadores,
    consignatario,
    clientes,
    fincas,
    choferes
);


export default app;