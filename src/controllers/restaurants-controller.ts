import { QueryResult } from 'pg';
import { Request, Response } from 'express';
import {
	Restaurant,
	RestaurantEntity,
} from '../protocols/restaurants-protocol.js';
import { newRestaurantSchema } from '../schemas/restaurants-schema.js';
import {
	changeRestaurantData,
	getAllRestaurants,
	insertNewRestaurant,
	removeExistentRestaurant,
	searchCategoryById,
	searchRestaurantById,
	searchRestaurantByName,
} from '../repositories/restaurants-repository.js';
import { removeExistentRating, searchSpecificRating } from '../repositories/ratings-repository.js';

async function listRestaurants(req: Request, res: Response) {
	try {
		const allRestaurants: QueryResult<RestaurantEntity> =
			await getAllRestaurants();

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
	const userId: number = res.locals.userId;

	if (error) {
		const messages: string = error.details.map((err) => err.message).join('\n');
		return res.status(422).send(`Ocorreram os seguintes erros:\n\n${messages}`);
	}

	try {
		const hasName: QueryResult<Restaurant> = await searchRestaurantByName(name);
		const hasCategory: QueryResult = await searchCategoryById(categoryId);

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

		insertNewRestaurant(name, categoryId, userId);

		return res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function deleteRestaurant(req: Request, res: Response) {
	const id = Number(req.params.id);
	const userId: number = res.locals.userId;

	if (isNaN(id)) {
		return res
			.status(422)
			.send('O id informado não é válido. Revise-o e tente novamente.');
	}

	try {
		const hasRestaurant: QueryResult<Restaurant> = await searchRestaurantById(
			id
		);

		if (hasRestaurant.rows.length === 0) {
			return res
				.status(400)
				.send(
					'Não existe restaurante com o id informado. Revise-o e tente novamente.'
				);
		}

		if (hasRestaurant.rows[0].creatorId !== userId) {
			return res
				.status(400)
				.send(
					'Esse usuário não foi quem inseriu o restaurante e, portanto, não pode deletá-lo'
				);
		}

		const hasRatings = await searchSpecificRating(userId, id);

		if(hasRatings.rows.length > 0){
			removeExistentRating(hasRatings.rows[0].id)
		}

		removeExistentRestaurant(id);
		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

async function updateRestaurantsInfo(req: Request, res: Response) {
	const id = Number(req.params.id);
	const userId: number = res.locals.userId;

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
		const hasRestaurant: QueryResult<Restaurant> = await searchRestaurantById(
			id
		);
		const hasName: QueryResult<Restaurant> = await searchRestaurantByName(name);

		if (hasRestaurant.rows.length === 0) {
			return res
				.status(400)
				.send(
					'Não existe restaurante com o id informado. Revise-o e tente novamente.'
				);
		} else if (hasName.rows.length > 0) {
			return res
				.status(409)
				.send(
					'Já existe um restaurante com esse nome. Escolha outro ou avalie o já existente.'
				);
		} else if (hasRestaurant.rows[0].creatorId !== userId) {
			return res
				.status(400)
				.send(
					'Esse usuário não foi quem inseriu o restaurante e, portanto, não pode alterá-lo'
				);
		}

		changeRestaurantData(name, categoryId, id);
		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

export {
	listRestaurants,
	insertRestaurant,
	deleteRestaurant,
	updateRestaurantsInfo,
};
