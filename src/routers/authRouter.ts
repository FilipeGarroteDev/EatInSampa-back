import express from 'express';
import * as authController from '../controllers/auth-controller.js';

const router = express.Router();

router.post('/signup', authController.signUp);

export default router;
