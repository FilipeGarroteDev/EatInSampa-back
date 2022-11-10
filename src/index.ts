import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/auth-router.js';
import restaurantsRouter from './routers/restaurants-router.js';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(authRouter);
server.use(restaurantsRouter);


server.listen(process.env.PORT, () =>
	console.log(`Listening on port ${process.env.PORT}`)
);
