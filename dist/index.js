import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/authRouter.js';
dotenv.config();
var server = express();
server.use(cors());
server.use(express.json());
server.use(authRouter);
server.listen(process.env.PORT, function () {
    return console.log("Listening on port ".concat(process.env.PORT));
});
