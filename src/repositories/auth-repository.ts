import { prisma } from '../database/db.js';
import { SessionEntity } from '../protocols/session-protocol.js';
import { CreatedUser } from '../protocols/users-protocol.js';

function searchUserByEmail(email: string) {
	return prisma.users.findFirst({
		where: {
			email,
		},
	});
}

function insertNewUser(newUser: CreatedUser) {
	return prisma.users.create({
		data: newUser,
	});
}

function loginNewUserSession(session: Omit<SessionEntity, 'id'>) {
	return prisma.sessions.create({
		data: session,
	});
}

function searchActiveSession(token: string) {
	const session = prisma.sessions.findUnique({
		where: {
			token,
		},
	});
	return session;
}

export {
	searchUserByEmail,
	insertNewUser,
	loginNewUserSession,
	searchActiveSession,
};
