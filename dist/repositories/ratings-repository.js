import { connection } from '../database/db.js';
import { searchRestaurantById } from './restaurants-repository.js';
function searchSpecificRating(userId, restaurantId) {
    var ratingPromise = connection.query('SELECT * FROM ratings WHERE "userId" = $1 AND "restaurantId" = $2', [userId, restaurantId]);
    return ratingPromise;
}
function insertNewRating(userId, restaurantId, rating) {
    connection.query('INSERT INTO ratings ("userId", "restaurantId", rating) VALUES ($1, $2, $3)', [userId, restaurantId, rating]);
}
function removeExistentRating(ratingId) {
    connection.query("DELETE FROM ratings WHERE id = $1", [ratingId]);
}
function changeRatingVote(rating, ratingId) {
    connection.query("UPDATE \n      ratings \n    SET \n      rating = $1 \n    WHERE id = $2", [rating, ratingId]);
}
export { searchRestaurantById, searchSpecificRating, insertNewRating, removeExistentRating, changeRatingVote, };
