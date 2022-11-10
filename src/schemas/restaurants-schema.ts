import joi from 'joi';

const newRestaurantSchema = joi.object({
  name: joi.string().required(),
  categoryId: joi.number().required(),
})


export {newRestaurantSchema}