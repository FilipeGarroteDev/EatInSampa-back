import express from 'express';
import * as ratingsController from '../controllers/ratings-controller';
import { authMiddleware } from '../middlewares/authentication-middleware';

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

export default router;
