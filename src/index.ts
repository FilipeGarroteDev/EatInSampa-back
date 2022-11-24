import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/auth-router";
import restaurantsRouter from "./routers/restaurants-router";
import ratingsRouter from "./routers/ratings-router";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(authRouter);
server.use(restaurantsRouter);
server.use(ratingsRouter);

server.listen(process.env.PORT, () =>
	console.log(`Listening on port ${process.env.PORT}`)
);

export default server;
