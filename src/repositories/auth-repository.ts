import { QueryResult } from 'pg';
import { connection } from '../database/db.js';
import { SessionEntity } from '../protocols/session-protocol.js';
import { UserEntity } from '../protocols/users-protocol.js';

function searchUserByEmail(email: string): Promise<QueryResult<UserEntity>> {
	const searchedUser: Promise<QueryResult<UserEntity>> = connection.query(
		'SELECT * FROM users WHERE email = $1',
		[email]
	);

	return searchedUser;
}

function insertNewUser(name: string, email: string, password: string): void {
	connection.query(
		'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
		[name, email, password]
	);
}

function loginNewUserSession(userId: number, token: string): void {
	connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [
		userId,
		token,
	]);
}

function searchActiveSession(
	token: string
): Promise<QueryResult<SessionEntity>> {
	const session: Promise<QueryResult<SessionEntity>> = connection.query(
		`SELECT * FROM sessions WHERE token = $1`,
		[token]
	);
	return session;
}

export {
	searchUserByEmail,
	insertNewUser,
	loginNewUserSession,
	searchActiveSession,
};
