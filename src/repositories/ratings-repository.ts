import { prisma } from '../database/db';
import { NewRating } from '../protocols/ratings-protocol';
import { searchRestaurantById } from './restaurants-repository';

function searchSpecificRating(userId: number, restaurantId: number) {
	const ratingPromise = prisma.ratings.findFirst({
		where: {
			userId,
			restaurantId,
		},
	});
	return ratingPromise;
}

function insertOrUpdateRating(rating: NewRating, id: number) {
	return prisma.ratings.upsert({
		where: {
			id,
		},
		create: rating,
		update: {
			rating: rating.rating,
		},
	});
}

function removeExistentRating(ratingId: number) {
	return prisma.ratings.delete({
		where: {
			id: ratingId,
		},
	});
}

export {
	searchRestaurantById,
	searchSpecificRating,
	insertOrUpdateRating,
	removeExistentRating,
};
