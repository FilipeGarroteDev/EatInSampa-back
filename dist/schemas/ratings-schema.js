import joi from 'joi';
var ratingSchema = joi.object({
    rating: joi.number().integer().min(0).max(5).required()
});
export { ratingSchema };
