'use strict';

process.env.SECRET='test';

const jwt = require('jsonwebtoken');

const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');

const mockRequest = supergoose.server(server);

let users = {
  admin: {username: 'admin', password: 'password', role: 'admin'},
  editor: {username: 'editor', password: 'password', role: 'editor'},
  user: {username: 'user', password: 'password', role: 'user'},
};

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Auth Router', () => {
  
  Object.keys(users).forEach( userType => {
    
    describe(`${userType} users`, () => {
      
      let encodedToken;
      let id;
      let key;
      
      it('can create one', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            id = token.id;
            encodedToken = results.text;
            expect(token.id).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
          });
      });

      it('can assign a key', () => {
        return mockRequest.post('/key')
          .set('authorization', `Bearer ${encodedToken}`)
          .then(results => {
            key = results.text;
            var verifiedKey = jwt.verify(results.text, process.env.SECRET);
            expect(verifiedKey.type).toEqual('key');
            expect(results.status).toBe(200);
          });
      });

      describe('protected route', () => {
        it('can access the protected route with a token', () => {
          return mockRequest.get('/protected-route')
            .set('authorization', `Bearer ${encodedToken}`)
            .then(results => {
              expect(results.status).toBe(200);
            });
        });

        it('can access the protected route with a key', () => {
          return mockRequest.get('/protected-route')
            .set('authorization', `Bearer ${key}`)
            .then(results => {
              expect(results.status).toBe(200);
            });
        });

        it('single use tokens can only be used once', () => {
          return mockRequest.get('/protected-route')
            .set('authorization', `Bearer ${encodedToken}`)
            .then(results => {
              if(process.env.SINGLE_USE) {
                expect(results.status).toBe(500);
              }
            });

        });

        it('keys can be used more than once', () => {
          return mockRequest.get('/protected-route')
            .set('authorization', `Bearer ${key}`)
            .then(results => {
              expect(results.status).toBe(200);
            });
        });
      });
    });
    
  });
  
});