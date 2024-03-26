import express, { Router } from 'express';

import { AuthController } from './auth.controller';


export const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

