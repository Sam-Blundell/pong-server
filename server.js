import express from 'express';
import http from 'http';
import { errorMethodNotAllowed, errorNoRoute } from './errorHandling.js';
import setupSocketServer from './websocket.js';

const app = express();
const server = http.createServer(app);
setupSocketServer(server);

app.route('/')
    .get((req, res) => {
        res.status(200).send({ msg: 'hello world' });
    })
    .all(errorMethodNotAllowed);

app.use('/*', errorNoRoute);

export { server, app };
