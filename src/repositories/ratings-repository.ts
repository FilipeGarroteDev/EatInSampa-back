import { QueryResult } from 'pg';
import { prisma } from '../database/db.js';
import { RatingEntity } from '../protocols/ratings-protocol.js';
import { searchRestaurantById } from './restaurants-repository.js';

function searchSpecificRating(userId: number, restaurantId: number) {
	const ratingPromise = prisma.ratings.findFirst({
		where: {
			userId,
			restaurantId,
		},
	});
	return ratingPromise;
}

function insertNewRating(
	userId: number,
	restaurantId: number,
	rating: number
): void {
	connection.query(
		'INSERT INTO ratings ("userId", "restaurantId", rating) VALUES ($1, $2, $3)',
		[userId, restaurantId, rating]
	);
}

function removeExistentRating(ratingId: number) {
	return prisma.ratings.delete({
		where: {
			id: ratingId,
		},
	});
}

function changeRatingVote(rating: number, ratingId: number): void {
	connection.query(
		`UPDATE 
      ratings 
    SET 
      rating = $1 
    WHERE id = $2`,
		[rating, ratingId]
	);
}

export {
	searchRestaurantById,
	searchSpecificRating,
	insertNewRating,
	removeExistentRating,
	changeRatingVote,
};
