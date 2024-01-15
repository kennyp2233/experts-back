import express from 'express';
import aerolineasRouter from '../routes/aerolineas.route';
import bodyParser from 'body-parser';

const app = express();

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.use(bodyParser.json());
app.use('/api/v1/', aerolineasRouter);

export default app;