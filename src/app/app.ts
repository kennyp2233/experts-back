import express from 'express';
import aerolineasRouter from '../routes/aerolineas.route';

const app = express();

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/', aerolineasRouter);

export default app;