import { Request, Response } from 'express';
import { SignUp } from '../protocols/auth-protocol';
import bcrypt from 'bcrypt';
import { signUpSchema } from '../schemas/authSchema.js';
import { connection } from '../database/db.js';

async function signUp(req: Request, res: Response) {
	const { name, email, password } = req.body as SignUp;
	const { error } = signUpSchema.validate(req.body, { abortEarly: false });

	if (error) {
		const messages = error.details.map((err) => err.message).join('\n');
		return res
			.status(422)
			.send(`Os seguintes erros foram encontrados:\n\n${messages}`);
	}

	const hashedPassword: string = await bcrypt.hash(password, 10);

	try {
		await connection.query(
			'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
			[name, email, hashedPassword]
		);

		res.sendStatus(201);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

async function signIn(req: Request, res: Response) {}

export { signIn, signUp };
