import { QueryResult } from 'pg';
import { connection } from '../database/db.js';
import {
	Restaurant,
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

function searchRestaurantByName(
	name: string
): Promise<QueryResult<Restaurant>> {
	const restaurantPromise: Promise<QueryResult<Restaurant>> = connection.query(
		`
    SELECT * FROM restaurants WHERE name = $1
  `,
		[name]
	);

	return restaurantPromise;
}

function searchRestaurantById(id: number): Promise<QueryResult<Restaurant>> {
	const restaurantPromise: Promise<QueryResult<Restaurant>> = connection.query(
		`
    SELECT * FROM restaurants WHERE id = $1
    `,
		[id]
	);

	return restaurantPromise;
}

function searchCategoryById(id: number): Promise<QueryResult> {
	const categoryPromise: Promise<QueryResult> = connection.query(
		`
    SELECT * FROM categories WHERE id = $1
  `,
		[id]
	);

	return categoryPromise;
}

function insertNewRestaurant(
	name: string,
	categoryId: number,
	userId: number
): void {
	connection.query(
		'INSERT INTO restaurants (name, "categoryId", "creatorId") VALUES ($1, $2, $3)',
		[name, categoryId, userId]
	);
}

function removeExistentRestaurant(id: number): void {
	connection.query(`DELETE FROM restaurants WHERE id = $1`, [id]);
}

function changeRestaurantData(
	name: string,
	categoryId: number,
	id: number
): void {
	connection.query(
		`UPDATE 
      restaurants 
    SET 
      name = $1, 
      "categoryId" = $2 
    WHERE id = $3`,
		[name, categoryId, id]
	);
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
