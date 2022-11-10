type RestaurantEntity = {
	id: number;
	name: string;
	categoryId?: number;
	category: string;
	averageRating: number;
	totalAvaliations: number;
};

type NewRestaurant = Partial<RestaurantEntity>;

export { RestaurantEntity, NewRestaurant };
