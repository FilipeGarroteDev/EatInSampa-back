import express from 'express';
import * as restaurantController from '../controllers/restaurants-controller.js';

const router = express.Router();

router.get('/restaurants', restaurantController.listRestaurants);
router.post('/restaurants', restaurantController.insertRestaurant);

export default router;
