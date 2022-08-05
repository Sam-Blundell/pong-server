import { expect } from 'chai';
import request from 'supertest';
import server from '../server.js';

describe('Server Testing', () => {
    describe('hello world', () => {
        it('GET:200, should respond with "hello world".', () => request(server).get('/')
            .expect(200)
            .then((response) => {
                expect(response.body.msg).to.equal('hello world');
            }));
    });
    describe('forbidden methods', () => {
        it('POST/PATCH/ETC:405, should return 405 method not allowed when / is given anything other than a get request', () => request(server).post('/')
            .expect(405)
            .then((response) => {
                expect(response.body.msg).to.equal('405 Method Not Allowed');
            }));
    });
    describe('404 Error', () => {
        it('GET:404, should respond with appropriate error and error message', () => request(server).get('/doesntexist')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).to.equal('404 Page Not Found');
            }));
    });
});
