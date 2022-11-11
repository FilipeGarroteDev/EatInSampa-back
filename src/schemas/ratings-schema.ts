import joi from 'joi';

const ratingSchema = joi.object({
  rating: joi.number().min(0).max(5).required()
})


export {ratingSchema}