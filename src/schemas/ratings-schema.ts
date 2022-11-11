import joi from 'joi';

const ratingSchema = joi.object({
  userId: joi.number().required(),
  restaurantId: joi.number().required(),
  rating: joi.number().min(0).max(5).required()
})


export {ratingSchema}