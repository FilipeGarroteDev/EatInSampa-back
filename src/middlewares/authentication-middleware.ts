import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { connection } from '../database/db';
import { SessionEntity } from '../protocols/session-protocol';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const token: string = req.headers.authorization?.replace('Bearer ', '');

	if (!token) {
		res
			.status(422)
			.send(
				'O token de acesso está expirado ou é inválido. Por favor, refaça o login.'
			);
	}

	try {
		const session: QueryResult<SessionEntity> = await connection.query(
			`SELECT * FROM sessions WHERE token = $1`,
			[token]
		);

		if (session.rows.length === 0) {
			return res
				.status(422)
				.send('O token informado é inválido. Por favor, refaça o login.');
		}

		res.locals.userId = session.rows[0].userId;
		next();
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

export { authMiddleware };
