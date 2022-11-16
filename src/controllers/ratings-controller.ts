// import { QueryResult } from 'pg';
// import { Request, Response } from 'express';
// import { Rating, RatingEntity } from '../protocols/ratings-protocol.js';
// import { ratingSchema } from '../schemas/ratings-schema.js';
// import { Restaurant } from '../protocols/restaurants-protocol.js';
// import {
// 	changeRatingVote,
// 	insertNewRating,
// 	removeExistentRating,
// 	searchRestaurantById,
// 	searchSpecificRating,
// } from '../repositories/ratings-repository.js';

// async function rateRestaurant(req: Request, res: Response) {
// 	const { rating } = req.body as Rating;
// 	const params = req.params as Rating;
// 	const userId: number = res.locals.userId;
// 	const restaurantId: number = Number(params.restaurantId);

// 	if (isNaN(restaurantId)) {
// 		return res
// 			.status(404)
// 			.send('O id informado não é válido. Revise-o e tente novamente.');
// 	}

// 	const { error } = ratingSchema.validate(req.body as Rating, {
// 		abortEarly: false,
// 	});

// 	if (error) {
// 		const messages: string = error.details.map((err) => err.message).join('\n');
// 		return res.status(422).send(`Ocorreram os seguintes erros:\n\n${messages}`);
// 	}

// 	try {
// 		const hasRestaurant: QueryResult<Restaurant> = await searchRestaurantById(
// 			restaurantId
// 		);

// 		if (hasRestaurant.rows.length === 0) {
// 			return res
// 				.status(404)
// 				.send(
// 					'Não foi localizado um restaurante com o id informado. Por gentileza, revise os dados'
// 				);
// 		}

// 		const searchedRating: QueryResult<RatingEntity> =
// 			await searchSpecificRating(userId, restaurantId);

// 		if (searchedRating.rows.length > 0) {
// 			updateRatingData(req, res);
// 			return;
// 		}

// 		insertNewRating(userId, restaurantId, rating);

// 		return res.sendStatus(201);
// 	} catch (error) {
// 		return res.status(500).send(error.message);
// 	}
// }

// async function deleteRating(req: Request, res: Response) {
// 	const params = req.params as Rating;
// 	const restaurantId: number = Number(params.restaurantId);
// 	const userId: number = res.locals.userId;

// 	if (isNaN(restaurantId)) {
// 		return res
// 			.status(404)
// 			.send('O id informado não é válido. Revise-o e tente novamente.');
// 	}

// 	try {
// 		const hasRestaurant: QueryResult<Restaurant> = await searchRestaurantById(
// 			restaurantId
// 		);

// 		if (hasRestaurant.rows.length === 0) {
// 			return res
// 				.status(404)
// 				.send(
// 					'Não existe restaurante com o id informado. Revise-o e tente novamente.'
// 				);
// 		}

// 		const searchedRating: QueryResult<RatingEntity> =
// 			await searchSpecificRating(userId, restaurantId);

// 		if (searchedRating.rows.length === 0) {
// 			return res
// 				.status(404)
// 				.send(
// 					'Não há restaurante com o id informado ou o usuário não é o dono da avaliação e, portanto, não pode deletá-lo'
// 				);
// 		}

// 		removeExistentRating(searchedRating.rows[0].id);
// 		return res.sendStatus(200);
// 	} catch (error) {
// 		return res.status(500).send(error.message);
// 	}
// }

// async function updateRatingData(req: Request, res: Response) {
// 	const { rating } = req.body as Rating;
// 	const params = req.params as Rating;
// 	const restaurantId: number = Number(params.restaurantId);
// 	const userId: number = res.locals.userId;

// 	if (isNaN(restaurantId)) {
// 		return res
// 			.status(404)
// 			.send('O id informado não é válido. Revise-o e tente novamente.');
// 	}

// 	const { error } = ratingSchema.validate(req.body as Rating, {
// 		abortEarly: false,
// 	});

// 	if (error) {
// 		const messages: string = error.details.map((err) => err.message).join('\n');
// 		return res.status(422).send(`Ocorreram os seguintes erros:\n\n${messages}`);
// 	}

// 	try {
// 		const hasRestaurant: QueryResult<Restaurant> = await searchRestaurantById(
// 			restaurantId
// 		);

// 		if (hasRestaurant.rows.length === 0) {
// 			return res
// 				.status(404)
// 				.send(
// 					'Não existe restaurante com o id informado. Revise-o e tente novamente.'
// 				);
// 		}

// 		const searchedRating: QueryResult<RatingEntity> =
// 			await searchSpecificRating(userId, restaurantId);

// 		if (searchedRating.rows.length === 0) {
// 			return res
// 				.status(404)
// 				.send(
// 					'Não há restaurante com o id informado ou o usuário não é o dono da avaliação e, portanto, não pode deletá-lo'
// 				);
// 		}

// 		changeRatingVote(rating, searchedRating.rows[0].id);
// 		return res.sendStatus(200);
// 	} catch (error) {
// 		return res.status(500).send(error.message);
// 	}
// }

// export { rateRestaurant, deleteRating, updateRatingData };
