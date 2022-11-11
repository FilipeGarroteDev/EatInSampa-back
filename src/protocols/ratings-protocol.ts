type RatingEntity = {
  id: number;
  userId: number;
  restaurantId: number;
  rating: number;
}

type Rating = Partial<RatingEntity>

export {RatingEntity, Rating}