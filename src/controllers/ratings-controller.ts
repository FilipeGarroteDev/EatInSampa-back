import { Request, Response } from 'express';
import {
	NewRating,
	Rating,
	RatingEntity,
} from '../protocols/ratings-protocol';
import { ratingSchema } from '../schemas/ratings-schema';
import { Restaurant } from '../protocols/restaurants-protocol';
import {
	insertOrUpdateRating,
	removeExistentRating,
	searchRestaurantById,
	searchSpecificRating,
} from '../repositories/ratings-repository';

async function rateRestaurant(req: Request, res: Response) {
	const { rating } = req.body as Rating;
	const params = req.params as Rating;
	const userId: number = res.locals.userId;
	const restaurantId: number = Number(params.restaurantId);

	if (isNaN(restaurantId)) {
		return res
			.status(404)
			.send('O id informado não é válido. Revise-o e tente novamente.');
	}

	const { error } = ratingSchema.validate(req.body as Rating, {
		abortEarly: false,
	});

	if (error) {
		const messages: string = error.details.map((err) => err.message).join('\n');
		return res.status(422).send(`Ocorreram os seguintes erros:\n\n${messages}`);
	}

	try {
		const hasRestaurant: Restaurant = await searchRestaurantById(restaurantId);

		if (!hasRestaurant) {
			return res
				.status(404)
				.send(
					'Não foi localizado um restaurante com o id informado. Por gentileza, revise os dados'
				);
		}

		const searchedRating: RatingEntity = await searchSpecificRating(
			userId,
			restaurantId
		);

		const ratingId: number = searchedRating ? searchedRating.id : 0;

		await insertOrUpdateRating(
			{ userId, restaurantId, rating } as NewRating,
			ratingId
		);

		return res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function deleteRating(req: Request, res: Response) {
	const params = req.params as Rating;
	const restaurantId: number = Number(params.restaurantId);
	const userId: number = res.locals.userId;

	if (isNaN(restaurantId)) {
		return res
			.status(404)
			.send('O id informado não é válido. Revise-o e tente novamente.');
	}

	try {
		const hasRestaurant = await searchRestaurantById(restaurantId);

		if (!hasRestaurant) {
			return res
				.status(404)
				.send(
					'Não existe restaurante com o id informado. Revise-o e tente novamente.'
				);
		}

		const searchedRating = await searchSpecificRating(userId, restaurantId);

		if (!searchedRating) {
			return res
				.status(404)
				.send(
					'Não há restaurante com o id informado ou o usuário não é o dono da avaliação e, portanto, não pode deletá-lo'
				);
		}

		removeExistentRating(searchedRating.id);
		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

export { rateRestaurant, deleteRating };
