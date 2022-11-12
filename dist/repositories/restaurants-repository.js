import { connection } from '../database/db.js';
function getAllRestaurants() {
    var allRestaurants = connection.query("\n      SELECT\n        restaurants.id,\n        restaurants.name,\n        categories.name AS category,\n        CASE \n          WHEN AVG(ratings.rating) IS NULL\n          THEN 0\n          ELSE TRUNC(AVG(ratings.rating), 2)\n        END AS \"averageRating\",\n        COUNT(ratings.\"restaurantId\") AS \"totalAvaliations\"\n      FROM restaurants\n      JOIN categories\n        ON restaurants.\"categoryId\" = categories.id\n      LEFT JOIN ratings\n        ON restaurants.id = ratings.\"restaurantId\"\n      GROUP BY restaurants.id, categories.name\n      ORDER BY \"averageRating\" DESC;\n    ");
    return allRestaurants;
}
function searchRestaurantByName(name) {
    var restaurantPromise = connection.query("\n    SELECT * FROM restaurants WHERE name = $1\n  ", [name]);
    return restaurantPromise;
}
function searchRestaurantById(id) {
    var restaurantPromise = connection.query("\n    SELECT * FROM restaurants WHERE id = $1\n    ", [id]);
    return restaurantPromise;
}
function searchCategoryById(id) {
    var categoryPromise = connection.query("\n    SELECT * FROM categories WHERE id = $1\n  ", [id]);
    return categoryPromise;
}
function insertNewRestaurant(name, categoryId, userId) {
    connection.query('INSERT INTO restaurants (name, "categoryId", "creatorId") VALUES ($1, $2, $3)', [name, categoryId, userId]);
}
function removeExistentRestaurant(id) {
    connection.query("DELETE FROM restaurants WHERE id = $1", [id]);
}
function changeRestaurantData(name, categoryId, id) {
    connection.query("UPDATE \n      restaurants \n    SET \n      name = $1, \n      \"categoryId\" = $2 \n    WHERE id = $3", [name, categoryId, id]);
}
export { getAllRestaurants, searchRestaurantByName, searchCategoryById, insertNewRestaurant, searchRestaurantById, removeExistentRestaurant, changeRestaurantData, };
