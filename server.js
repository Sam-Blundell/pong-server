import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import { errorMethodNotAllowed, errorNoRoute } from './errorHandling.js';

const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
    console.log('new client connected');
    socket.send('welcome new client');
    socket.on('message', (data) => {
        console.log('received: %s', data);
        socket.send(`Got your message it's: ${data}`);
    });
});

app.route('/')
    .get((req, res) => {
        res.status(200).send({ msg: 'hello world' });
    })
    .all(errorMethodNotAllowed);

app.use('/*', errorNoRoute);

export { server, app };
