import { QueryResult } from 'pg';
import {Request, Response} from 'express';
import { connection } from '../database/db.js';
import { RestaurantEntity } from '../protocols/restaurants-protocol.js';

async function listRestaurants(req: Request, res: Response) {
	try {
		const allRestaurants: QueryResult<RestaurantEntity> =
			await connection.query(`
      SELECT
        restaurants.id,
        restaurants.name,
        categories.name AS category,
        TRUNC(AVG(ratings.rating), 2) AS "averageRating",
        COUNT(ratings."restaurantId") AS "totalAvaliations"
      FROM restaurants
      JOIN categories
        ON restaurants."categoryId" = categories.id
      JOIN ratings
        ON restaurants.id = ratings."restaurantId"
      GROUP BY restaurants.id, categories.name
      ORDER BY "averageRating" DESC;
    `);

		return res.status(200).send(allRestaurants.rows)
	} catch (error) {
    return res.status(500).send(error.message)
  }
}

async function insertRestaurant() {}

async function deleteRestaurant() {}

async function updateRestaurantsInfo() {}

export {
	listRestaurants,
	insertRestaurant,
	deleteRestaurant,
	updateRestaurantsInfo,
};
