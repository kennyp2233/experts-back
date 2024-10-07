import express, { Request, Response, NextFunction } from 'express';
import {  paisesJoinAcuerdos } from '@services/mantenimiento/paises.servicio';

const router = express.Router();

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send(await paisesJoinAcuerdos());
        } catch (error: any) {
            next(error);
        }
    });

export default router;