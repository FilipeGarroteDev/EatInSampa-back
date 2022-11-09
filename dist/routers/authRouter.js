import express from 'express';
import * as authController from '../controllers/auth-controller.js';
var router = express.Router();
router.post('/signup', authController.signUp);
export default router;
