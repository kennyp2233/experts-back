import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from 'express-jwt';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if (err instanceof UnauthorizedError) {
        res.status(401).json({ ok: false, msg: 'Token inválido o no provisto' });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default errorHandler;
