// src/routes/usuarios/auth.route.ts

import express from 'express';
import { body } from 'express-validator';
import validationMiddleware from '@middlewares/validationMiddleware';
import { 
  loginController, 
  logoutController, 
  registerController, 
  getMeController 
} from '@controllers/auth.controller';

const router = express.Router();

router.post('/login',
  [
    body('usuario').exists().withMessage('Usuario no provisto'),
    body('pass').exists().withMessage('Contraseña no provista'),
    body('recordar').optional().isBoolean().withMessage('Recordar debe ser booleano')
  ],
  validationMiddleware,
  loginController
);

router.post('/logout', logoutController);

router.post('/register',
  [
    body('usuario').exists().withMessage('Usuario no provisto'),
    body('email').exists().withMessage('Email no provisto'),
    body('pass').exists().withMessage('Contraseña no provista'),
    body('selectedRole').isIn(['cliente', 'finca']).withMessage('Rol debe ser cliente o finca'),
  ],
  validationMiddleware,
  registerController
);

router.get('/me', getMeController);

export default router;