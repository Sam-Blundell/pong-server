import express from 'express';
import noRouteError from './errorHandling.js';

const server = express();

server.use('/*', noRouteError);

export default server;
