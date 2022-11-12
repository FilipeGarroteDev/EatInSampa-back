import { connection } from '../database/db.js';
function searchUserByEmail(email) {
    var searchedUser = connection.query('SELECT * FROM users WHERE email = $1', [email]);
    return searchedUser;
}
function insertNewUser(name, email, password) {
    connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
}
function loginNewUserSession(userId, token) {
    connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [
        userId,
        token,
    ]);
}
function searchActiveSession(token) {
    var session = connection.query("SELECT * FROM sessions WHERE token = $1", [token]);
    return session;
}
export { searchUserByEmail, insertNewUser, loginNewUserSession, searchActiveSession, };
