import express from 'express';
import * as ratingsController from '../controllers/ratings-controller.js';
import { authMiddleware } from '../middlewares/authentication-middleware.js';

const router = express.Router();

router.post(
	'restaurants/rating/:restaurantId',
	authMiddleware,
	ratingsController.rateRestaurant
);
// router.delete('/restaurants/:id', authMiddleware, ratingsController.deleteRestaurant);
// router.patch('/restaurants/:id', authMiddleware, ratingsController.updateRestaurantsInfo);

export default router;
