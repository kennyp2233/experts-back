import express from 'express';
import bodyParser from 'body-parser';


import aerolineasRouter from '@routes/aerolineas.route';
import paisesRouter from '@routes/paises.route';
import origenesRouter from '@routes/origenes.route';
import caeAduanaRouter from '@routes/cae_aduana.route';


const app = express();

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.use(bodyParser.json());
app.use('/api/v1/', aerolineasRouter);
app.use('/api/v1/', paisesRouter);
app.use('/api/v1/', origenesRouter);
app.use('/api/v1/', caeAduanaRouter);

export default app;