import express from 'express';
import { errorMethodNotAllowed, errorNoRoute } from './errorHandling.js';

const server = express();

server.route('/')
    .get((req, res) => {
        res.status(200).send({ msg: 'hello world' });
    })
    .all(errorMethodNotAllowed);

server.use('/*', errorNoRoute);

export default server;
