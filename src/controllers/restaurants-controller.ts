import { QueryResult } from "pg";
import { Request, Response } from "express";
import {
	NewRestaurant,
	Restaurant,
	RestaurantEntity,
} from "../protocols/restaurants-protocol.js";
import { newRestaurantSchema } from "../schemas/restaurants-schema.js";
import {
	changeRestaurantData,
	getAllRestaurants,
	insertNewRestaurant,
	removeExistentRestaurant,
	searchCategoryById,
	searchRestaurantById,
	searchRestaurantByName,
} from "../repositories/restaurants-repository.js";
import {
	removeExistentRating,
	searchSpecificRating,
} from "../repositories/ratings-repository.js";
import { RatingEntity } from "../protocols/ratings-protocol.js";

async function listRestaurants(req: Request, res: Response) {
	try {
		const allRestaurants = await getAllRestaurants();

		return res.status(200).send(allRestaurants);
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
		const messages: string = error.details.map((err) => err.message).join("\n");
		return res.status(422).send(`Ocorreram os seguintes erros:\n\n${messages}`);
	}

	try {
		const hasName: Restaurant = await searchRestaurantByName(name);
		const hasCategory = await searchCategoryById(categoryId);

		if (hasName) {
			return res
				.status(409)
				.send(
					"Já existe um restaurante com esse nome. Escolha outro ou avalie o já existente."
				);
		} else if (!hasCategory) {
			return res
				.status(422)
				.send(
					"O id informado não corresponde a nenhuma categoria existente. Por gentileza, revise os dados"
				);
		}

		await insertNewRestaurant({
			name,
			categoryId: Number(categoryId),
			creatorId: userId,
		} as NewRestaurant);

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
			.status(404)
			.send("O id informado não é válido. Revise-o e tente novamente.");
	}

	try {
		const hasRestaurant: Restaurant = await searchRestaurantById(id);

		if (!hasRestaurant) {
			return res
				.status(404)
				.send(
					"Não existe restaurante com o id informado. Revise-o e tente novamente."
				);
		}

		if (hasRestaurant.creatorId !== userId) {
			return res
				.status(401)
				.send(
					"Esse usuário não foi quem inseriu o restaurante e, portanto, não pode deletá-lo"
				);
		}

		const hasRatings: RatingEntity = await searchSpecificRating(userId, id);

		if (hasRatings) {
			await removeExistentRating(hasRatings.id);
		}

		await removeExistentRestaurant(id);
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
			.status(404)
			.send("O id informado não é válido. Revise-o e tente novamente.");
	}

	const { name, categoryId } = req.body as Restaurant;
	const { error } = newRestaurantSchema.validate(req.body as Restaurant, {
		abortEarly: false,
	});

	if (error) {
		const messages: string = error.details.map((err) => err.message).join("\n");
		return res.status(422).send(`Ocorreram os seguintes erros:\n\n${messages}`);
	}

	try {
		const hasRestaurant: Restaurant = await searchRestaurantById(id);
		const hasName: Restaurant = await searchRestaurantByName(name);

		if (!hasRestaurant) {
			return res
				.status(404)
				.send(
					"Não existe restaurante com o id informado. Revise-o e tente novamente."
				);
		} else if (hasName && hasName?.id !== id) {
			return res
				.status(409)
				.send(
					"Já existe um restaurante com esse nome. Escolha outro ou avalie o já existente."
				);
		} else if (hasRestaurant.creatorId !== userId) {
			return res
				.status(401)
				.send(
					"Esse usuário não foi quem inseriu o restaurante e, portanto, não pode alterá-lo"
				);
		}

		await changeRestaurantData(name, categoryId, id);
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
