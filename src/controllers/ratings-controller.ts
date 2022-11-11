import { QueryResult } from 'pg';
import { Request, Response } from 'express';
import { connection } from '../database/db.js';
import { Rating } from '../protocols/ratings-protocol.js';
import { ratingSchema } from '../schemas/ratings-schema.js';
import { Restaurant } from '../protocols/restaurants-protocol.js';

async function rateRestaurant(req: Request, res: Response) {
	const { rating } = req.body as Rating;
	const params = req.params as Rating;
	const restaurantId: number = Number(params.restaurantId);
	const { userId } = res.locals;
	const { error } = ratingSchema.validate(
		{ rating, restaurantId, userId },
		{
			abortEarly: false,
		}
	);

	if (error) {
		const messages: string = error.details.map((err) => err.message).join('\n');
		return res.status(422).send(`Ocorreram os seguintes erros:\n\n${messages}`);
	}

	try {
		const hasRestaurant: QueryResult<Restaurant> = await connection.query(
			'SELECT * FROM restaurants WHERE id = $1',
			[restaurantId]
		);

		if (hasRestaurant.rows.length === 0) {
			return res
				.status(404)
				.send(
					'Não foi localizado um restaurante com o id informado. Por gentileza, revise os dados'
				);
		}

		await connection.query(
			'INSERT INTO ratings ("userId", "restaurantId", rating) VALUES ($1, $2, $3)',
			[userId, restaurantId, rating]
		);

		return res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function deleteRating(req: Request, res: Response) {
	const id = Number(req.params.id);
	const { userId } = res.locals;

	if (isNaN(id)) {
		return res
			.status(422)
			.send('O id informado não é válido. Revise-o e tente novamente.');
	}

	try {
		const hasRestaurant: QueryResult<Restaurant> = await connection.query(
			`SELECT * FROM restaurants WHERE id = $1`,
			[id]
		);

		if (hasRestaurant.rows.length === 0) {
			return res
				.status(400)
				.send(
					'Não existe restaurante com o id informado. Revise-o e tente novamente.'
				);
		}

		if (hasRestaurant.rows[0].creatorId !== Number(userId)) {
			return res
				.status(400)
				.send(
					'Esse usuário não foi quem inseriu o restaurante e, portanto, não pode deletá-lo'
				);
		}

		await connection.query(`DELETE FROM restaurants WHERE id = $1`, [id]);
		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function changeRatingVote(req: Request, res: Response) {
	const id = Number(req.params.id);
	const { userId } = res.locals;

	if (isNaN(id)) {
		return res
			.status(422)
			.send('O id informado não é válido. Revise-o e tente novamente.');
	}

	const { name, categoryId } = req.body as Restaurant;
	const { error } = newRestaurantSchema.validate(req.body as Restaurant, {
		abortEarly: false,
	});

	if (error) {
		const messages: string = error.details.map((err) => err.message).join('\n');
		return res.status(422).send(`Ocorreram os seguintes erros:\n\n${messages}`);
	}

	try {
		const hasRestaurant: QueryResult<Restaurant> = await connection.query(
			`SELECT * FROM restaurants WHERE id = $1`,
			[id]
		);

		if (hasRestaurant.rows.length === 0) {
			return res
				.status(400)
				.send(
					'Não existe restaurante com o id informado. Revise-o e tente novamente.'
				);
		}

		if (hasRestaurant.rows[0].creatorId !== Number(userId)) {
			return res
				.status(400)
				.send(
					'Esse usuário não foi quem inseriu o restaurante e, portanto, não pode alterá-lo'
				);
		}

		await connection.query(
			`UPDATE 
        restaurants 
      SET 
        name = $1, 
        "categoryId" = $2 
      WHERE id = $3`,
			[name, categoryId, id]
		);
		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

export { rateRestaurant, deleteRating, changeRatingVote };