import joi from 'joi';
var newRestaurantSchema = joi.object({
    name: joi.string().required(),
    categoryId: joi.number().required()
});
export { newRestaurantSchema };
