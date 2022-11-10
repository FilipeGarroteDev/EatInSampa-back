import { Request, Response } from 'express';
import {
	UserEntity,
	LoggedUser,
	CreatedUser,
} from '../protocols/users-protocol';
import bcrypt from 'bcrypt';
import { loginSchema, signUpSchema } from '../schemas/authSchema.js';
import { connection } from '../database/db.js';
import jwt from 'jsonwebtoken';
import { QueryResult } from 'pg';

async function signUp(req: Request, res: Response) {
	const { name, email, password } = req.body as CreatedUser;
	const { error } = signUpSchema.validate(req.body, { abortEarly: false });

	if (error) {
		const messages: string = error.details.map((err) => err.message).join('\n');
		return res
			.status(422)
			.send(`Os seguintes erros foram encontrados:\n\n${messages}`);
	}

	const hashedPassword: string = await bcrypt.hash(password, 10);

	try {
		const searchedUser: QueryResult<UserEntity> = await connection.query(
			'SELECT * FROM users WHERE email = $1',
			[email]
		);

		if (searchedUser.rows.length > 0) {
			return res
				.status(409)
				.send('O e-mail informado já existe.\nPor gentileza, revise os dados');
		}

		await connection.query(
			'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
			[name, email, hashedPassword]
		);

		res.sendStatus(201);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

async function signIn(req: Request, res: Response) {
	const { email, password } = req.body as LoggedUser;
	const { error } = loginSchema.validate(req.body, { abortEarly: false });

	if (error) {
		const messages: string = error.details.map((err) => err.message).join('\n');
		return res.status(422).send(`Ocorreram os seguintes erros:\n\n${messages}`);
	}

	try {
		const user: QueryResult<UserEntity> = await connection.query(
			'SELECT * FROM users WHERE email = $1',
			[email]
		);
		const userPass = user.rows[0]?.password;
		const userId = user.rows[0]?.id;
		const isValid: boolean = await bcrypt.compare(password, userPass);

		if (user.rows.length === 0 || !isValid) {
			return res
				.status(422)
				.send(
					'O e-mail ou a senha informados estão incorretos.\nPor gentileza, verifique os dados e tente novamente'
				);
		}

		const config = { expiresIn: 60 * 45 };
		const token = jwt.sign({ userId }, process.env.JWT_SECRET, config);

		await connection.query(
			'INSERT INTO sessions ("userId", token) VALUES ($1, $2)',
			[userId, token]
		);

		res.status(200).send(token);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

export { signIn, signUp };
