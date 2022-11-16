import { Request, Response } from 'express';
import {
	UserEntity,
	LoggedUser,
	CreatedUser,
} from '../protocols/users-protocol';
import bcrypt from 'bcrypt';
import { loginSchema, signUpSchema } from '../schemas/auth-schema.js';
import jwt from 'jsonwebtoken';
import {
	insertNewUser,
	loginNewUserSession,
	searchUserByEmail,
} from '../repositories/auth-repository.js';
import { SessionEntity } from '../protocols/session-protocol';

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
		const searchedUser: UserEntity = await searchUserByEmail(
			email
		);

		if (searchedUser) {
			return res
				.status(409)
				.send('O e-mail informado já existe.\nPor gentileza, revise os dados');
		}

		await insertNewUser({name, email, password: hashedPassword} as CreatedUser);

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
		const searchedUser: UserEntity = await searchUserByEmail(
			email
		);
		const userPass = searchedUser?.password;
		const userId = searchedUser?.id;
		const isValid: boolean = userPass ? await bcrypt.compare(password, userPass) : false;

		if (!searchedUser || !isValid) {
			return res
				.status(401)
				.send(
					'O e-mail ou a senha informados estão incorretos.\nPor gentileza, verifique os dados e tente novamente'
				);
		}

		const config = { expiresIn: 60 * 45 };
		const token: string = jwt.sign({ userId }, process.env.JWT_SECRET, config);
		const newSession: Omit<SessionEntity, "id"> = {userId, token};

		await loginNewUserSession(newSession);

		res.status(200).send(token);
	} catch (error) {
		return res.status(500).send(error.message);
	}
}

export { signIn, signUp };
