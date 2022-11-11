type RestaurantEntity = {
	id: number;
	name: string;
	categoryId?: number;
	creatorId: number;
	category: string;
	averageRating: number;
	totalAvaliations: number;
};

type Restaurant = Partial<RestaurantEntity>;

export { RestaurantEntity, Restaurant };
