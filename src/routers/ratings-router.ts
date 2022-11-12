import express from 'express';
import * as ratingsController from '../controllers/ratings-controller.js';
import { authMiddleware } from '../middlewares/authentication-middleware.js';

const router = express.Router();

router.post(
	'/restaurants/rating/:restaurantId',
	authMiddleware,
	ratingsController.rateRestaurant
);
router.delete(
	'/restaurants/rating/:restaurantId',
	authMiddleware,
	ratingsController.deleteRating
);
router.patch(
	'/restaurants/rating/:restaurantId',
	authMiddleware,
	ratingsController.updateRatingData
);

export default router;
