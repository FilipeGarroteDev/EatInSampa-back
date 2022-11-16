type RatingEntity = {
	id: number;
	userId: number;
	restaurantId: number;
	rating: number;
};

type Rating = Partial<RatingEntity>;

type NewRating = {
	userId: number;
	restaurantId: number;
	rating: number;
};

export { RatingEntity, Rating, NewRating };
