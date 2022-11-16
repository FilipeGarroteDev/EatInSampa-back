import { QueryResult } from 'pg';
import { prisma } from '../database/db.js';
import {
	NewRestaurant,
	RestaurantEntity,
} from '../protocols/restaurants-protocol.js';

function getAllRestaurants(): Promise<QueryResult<RestaurantEntity>> {
	const allRestaurants: Promise<QueryResult<RestaurantEntity>> =
		connection.query(`
      SELECT
        restaurants.id,
        restaurants.name,
        categories.name AS category,
        CASE 
          WHEN AVG(ratings.rating) IS NULL
          THEN 0
          ELSE TRUNC(AVG(ratings.rating), 2)
        END AS "averageRating",
        COUNT(ratings."restaurantId") AS "totalAvaliations"
      FROM restaurants
      JOIN categories
        ON restaurants."categoryId" = categories.id
      LEFT JOIN ratings
        ON restaurants.id = ratings."restaurantId"
      GROUP BY restaurants.id, categories.name
      ORDER BY "averageRating" DESC;
    `);

	return allRestaurants;
}

function searchRestaurantByName(name: string) {
	const restaurantPromise = prisma.restaurants.findUnique({
		where: {
			name,
		},
	});

	return restaurantPromise;
}

function searchRestaurantById(id: number) {
	const restaurantPromise = prisma.restaurants.findUnique({
		where: { id },
	});

	return restaurantPromise;
}

function searchCategoryById(id: number) {
	const categoryPromise = prisma.categories.findUnique({
		where: { id },
	});

	return categoryPromise;
}

function insertNewRestaurant(newRestaurant: NewRestaurant) {
	return prisma.restaurants.create({
		data: newRestaurant,
	});
}

function removeExistentRestaurant(id: number) {
	return prisma.restaurants.delete({
		where: {
			id,
		},
	});
}

function changeRestaurantData(name: string, categoryId: number, id: number) {
	return prisma.restaurants.update({
		where: {
			id,
		},
		data: {
			name,
			categoryId,
		},
	});
}

export {
	getAllRestaurants,
	searchRestaurantByName,
	searchCategoryById,
	insertNewRestaurant,
	searchRestaurantById,
	removeExistentRestaurant,
	changeRestaurantData,
};
