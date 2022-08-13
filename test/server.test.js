import { expect } from 'chai';
import request from 'supertest';
import { app } from '../server.js';

describe('app Testing', () => {
    describe('hello world', () => {
        it('GET:301, should respond with 301 status.', () => request(app).get('/').expect(301));
    });
    describe('forbidden methods', () => {
        it('POST/PATCH/ETC:405, should return 405 method not allowed when / is given anything other than a get request', () => request(app).post('/')
            .expect(405)
            .then((response) => {
                expect(response.body.msg).to.equal('405 Method Not Allowed');
            }));
    });
    describe('404 Error', () => {
        it('GET:404, should respond with appropriate error and error message', () => request(app).get('/doesntexist')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).to.equal('404 Page Not Found');
            }));
    });
});
