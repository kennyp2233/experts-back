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


const app = express();
const path = [
    '/api/v1/login',
    '/api/v1/register',
];
app.use(cors());
app.use(expressjwt({ secret: process.env.SECRET_KEY || "", algorithms: ['HS256'] }).unless({ path: path }));
app.get('/', (_, res) => {
    res.send('Hello World!');
});



app.use(bodyParser.json());
app.use('/api/v1',
    aerolineasRouter,
    paisesRouter,
    origenesRouter,
    caeAduanaRouter,
    auth,
    acuerdosArancelariosRoute,
    destinos
);


export default app;