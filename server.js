import express from 'express';
import http from 'http';
import { errorMethodNotAllowed, errorNoRoute } from './errorHandling.js';
import setupSocketServer from './websocket.js';

const app = express();
const server = http.createServer(app);
setupSocketServer(server);

app.use('/pong', express.static('client'));
app.use('/pong/join/:gameid', express.static('client'));

app.route('/')
    .get((req, res) => {
        res.status(301).redirect(301, '/pong');
    })
    .all(errorMethodNotAllowed);

app.use('/*', errorNoRoute);

export { server, app };
