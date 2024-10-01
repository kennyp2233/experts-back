import express from 'express';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import { expressjwt } from 'express-jwt';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import errorHandler from '@middlewares/errorHandler';
import { jwtMiddleware } from '@middlewares/jwtMiddleware';
import {
    SECRET_KEY,
    PORT,
    HOST,
    PROTOCOL
} from './config';

// Importar routers
import aerolineasRouter from '@routes/mantenimiento/aerolineas.route';
import paisesRouter from '@routes/mantenimiento/paises.route';
import origenesRouter from '@routes/mantenimiento/origenes.route';
import caeAduanaRouter from '@routes/mantenimiento/cae_aduana.route';
import auth from '@routes/usuarios/auth.route';
import acuerdosArancelariosRoute from '@routes/mantenimiento/acuerdo_arancelario.route';
import destinosRouter from '@routes/mantenimiento/destinos.route';
import productosRouter from '@routes/mantenimiento/productos.route';
import catalogosRouter from '@routes/catalogos/catalogos.route';
import unidadesMedidaRouter from '@routes/mantenimiento/unidades_medida.route';
import tiposEmbarqueRouter from '@routes/mantenimiento/tipos_embarque.route';
import embarcadoresRouter from '@routes/mantenimiento/embarcadores.route';
import consignatarioRouter from '@routes/mantenimiento/consignatario.route';
import clientesRouter from '@routes/mantenimiento/clientes.route';
import fincasRouter from '@routes/mantenimiento/fincas.route';
import choferesRouter from '@routes/mantenimiento/choferes.route';

const app = express();

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: `${PROTOCOL}://${HOST}:${PORT}`,
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'], // Ajusta la ruta según tus archivos
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors({
    origin: true,  // Permitir cualquier origen temporalmente
    credentials: true,
}));



app.use(express.json());
app.use(cookieParser());


app.use(expressjwt({
    secret: SECRET_KEY!,
    algorithms: ['HS256'],
    getToken: (req) => {
        const token = req.cookies.access_token;
        return token || null;
    },
    credentialsRequired: true,
}).unless({ path: ['/api/v1/login', '/api/v1/register', '/api-docs'] }));


app.use(jwtMiddleware);

// Rutas
app.use('/api/v1',
    aerolineasRouter,
    paisesRouter,
    origenesRouter,
    caeAduanaRouter,
    auth,
    acuerdosArancelariosRoute,
    destinosRouter,
    productosRouter,
    catalogosRouter,
    unidadesMedidaRouter,
    tiposEmbarqueRouter,
    embarcadoresRouter,
    consignatarioRouter,
    clientesRouter,
    fincasRouter,
    choferesRouter
);

// Middleware para manejo de errores
app.use(errorHandler);

export default app;
