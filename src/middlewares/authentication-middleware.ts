import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { SessionEntity } from '../protocols/session-protocol.js';
import jwt from 'jsonwebtoken';
import { searchActiveSession } from '../repositories/auth-repository.js';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const token: string = req.headers.authorization?.replace('Bearer ', '');

	if (!token) {
		return res
			.status(401)
			.send(
				'O token de acesso está expirado ou é inválido. Por favor, refaça o login.'
			);
	}

	try {
		const tokenData: number = Number(jwt.verify(token, process.env.JWT_SECRET).userId);
		const session = await searchActiveSession(token)

		if (!session.id) {
			return res
				.status(401)
				.send('O token informado é inválido. Por favor, refaça o login.');
		}

		res.locals.userId = tokenData;
		next();
	} catch (error) {
		return res.status(500).send('O token de acesso está expirado ou é inválido. Por favor, refaça o login.');
	}
}

export { authMiddleware };
