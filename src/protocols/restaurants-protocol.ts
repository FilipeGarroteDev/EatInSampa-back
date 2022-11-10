type RestaurantEntity = {
	id: number;
	name: string;
	categoryId?: number;
	category: string;
	averageRating: number;
	totalAvaliations: number;
};

type Restaurant = Partial<RestaurantEntity>;

export { RestaurantEntity, Restaurant };
