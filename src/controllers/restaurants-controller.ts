import { QueryResult } from 'pg';
import { Request, Response } from 'express';
import { connection } from '../database/db.js';
import {
	Restaurant,
	RestaurantEntity,
} from '../protocols/restaurants-protocol.js';
import { newRestaurantSchema } from '../schemas/restaurants-schema.js';

async function listRestaurants(req: Request, res: Response) {
	try {
		const allRestaurants: QueryResult<RestaurantEntity> =
			await connection.query(`
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

		return res.status(200).send(allRestaurants.rows);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function insertRestaurant(req: Request, res: Response) {
	const { name, categoryId } = req.body as Restaurant;
	const { error } = newRestaurantSchema.validate(req.body, {
		abortEarly: false,
	});

	if (error) {
		const messages: string = error.details.map((err) => err.message).join('\n');
		return res.status(422).send(`Ocorreram os seguintes erros:\n\n${messages}`);
	}

	try {
		const hasName: QueryResult<Restaurant> = await connection.query(
			`
      SELECT * FROM restaurants WHERE name = $1
    `,
			[name]
		);

		const hasCategory: QueryResult = await connection.query(
			`
      SELECT * FROM categories WHERE id = $1
    `,
			[categoryId]
		);

		if (hasName.rows.length > 0) {
			return res
				.status(409)
				.send(
					'Já existe um restaurante com esse nome. Escolha outro ou avalie o já existente.'
				);
		} else if (hasCategory.rows.length === 0) {
			return res
				.status(422)
				.send(
					'O id informado não corresponde a nenhuma categoria existente. Por gentileza, revise os dados'
				);
		}

		await connection.query(
			'INSERT INTO restaurants (name, "categoryId") VALUES ($1, $2)',
			[name, categoryId]
		);

		return res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function deleteRestaurant(req: Request, res: Response) {}

async function updateRestaurantsInfo(req: Request, res: Response) {}

export {
	listRestaurants,
	insertRestaurant,
	deleteRestaurant,
	updateRestaurantsInfo,
};
