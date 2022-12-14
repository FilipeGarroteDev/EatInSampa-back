import express from 'express';
import * as restaurantController from '../controllers/restaurants-controller.js';
import { authMiddleware } from '../middlewares/authentication-middleware.js';

const router = express.Router();

router.get('/restaurants', restaurantController.listRestaurants);
router.post('/restaurants', authMiddleware, restaurantController.insertRestaurant);
router.delete('/restaurants/:id', authMiddleware, restaurantController.deleteRestaurant);
router.patch('/restaurants/:id', authMiddleware, restaurantController.updateRestaurantsInfo);

export default router;
