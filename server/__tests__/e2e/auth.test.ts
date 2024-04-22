import { Express } from 'express';
import request from 'supertest';
import { startServer, stopServer } from '../../src/server';
import purgeTestDatabase from '../../src/utils/purgeTestDatabase';

let server: Express;

beforeAll(async () => {
  server = await startServer();

  const agent = request.agent(server);
  const userData = {
    firstName: 'testFirst',
    lastName: 'testLast',
    email: 'testUser@example.com',
    password: 'testPassword',
    confirmPassword: 'testPassword',
  };

  await agent.post('/api/v1/users/register').send(userData);
});

afterAll(async () => {
  await purgeTestDatabase();
  await stopServer('Testing Complete');
});

describe('Auth Endpoints', () => {
  describe('POST /api/v1/auth/login', () => {
    it('should log in existing user', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };

      const response = await agent.post('/api/v1/auth/login').send(userData);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatchObject({
        firstName: 'testFirst',
        lastName: 'testLast',
        email: userData.email.toLowerCase(),
      });
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should not log in non-existent user', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'doesNotExist@example.com',
        password: 'doesNotExist',
      };

      const response = await agent.post('/api/v1/auth/login').send(userData);

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual(
        'Invalid email or password'
      );
    });

    it('should not log in the user with invalid form request', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'invalidEmail',
        password: '',
      };

      const response = await agent.post('/api/v1/auth/login').send(userData);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual(
        'Must be a valid email address'
      );
      expect(response.body.errors[1].message).toEqual(
        'Password must be between 6 and 255 characters long'
      );
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    it('should log out an logged in user', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent.post('/api/v1/auth/logout');

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('Successfully logged out');
    });
  });

  describe('GET /api/v1/auth/authenticate', () => {
    it('should authenticate the logged in user', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent.get('/api/v1/auth/authenticate');

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatchObject({
        firstName: 'testFirst',
        lastName: 'testLast',
      });
    });

    it('should not authenticate a user without an active session', async () => {
      const agent = request.agent(server);

      const response = await agent.get('/api/v1/auth/authenticate');

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual('Unauthorized');
    });
  });
});
