import { expect } from 'chai';
import request from 'supertest';
import server from '../server.js';

describe('Server Testing', () => {
    describe('404 Error', () => {
        it('GET:404, should respond with appropriate error and error message', () => request(server).get('/')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).to.equal('404 Page Not Found');
            }));
    });
});
