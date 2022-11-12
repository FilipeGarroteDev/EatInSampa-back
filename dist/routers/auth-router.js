import express from 'express';
import * as authController from '../controllers/auth-controller.js';
var router = express.Router();
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
export default router;
