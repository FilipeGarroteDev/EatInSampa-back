import express from 'express';
import * as restaurantController from '../controllers/restaurants-controller.js';

const router = express.Router();

router.get('/restaurants', restaurantController.listRestaurants);
router.post('/restaurants', restaurantController.insertRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);
router.patch('/restaurants/:id', restaurantController.updateRestaurantsInfo);

export default router;
