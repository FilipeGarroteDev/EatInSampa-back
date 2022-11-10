import express from 'express';
import * as restaurantController from '../controllers/restaurants-controller.js';

const router = express.Router();

router.get('/restaurants', restaurantController.listRestaurants);

export default router;
