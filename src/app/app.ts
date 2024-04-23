import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { expressjwt } from 'express-jwt';

import aerolineasRouter from '@routes/aerolineas.route';
import paisesRouter from '@routes/paises.route';
import origenesRouter from '@routes/origenes.route';
import caeAduanaRouter from '@routes/cae_aduana.route';
import auth from '@routes/auth.route';
import acuerdosArancelariosRoute from "@routes/acuerdo_arancelario.route"



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
    acuerdosArancelariosRoute
);


export default app;