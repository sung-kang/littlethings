import { Express } from 'express';
import request from 'supertest';
import { startServer, stopServer } from '../../src/server';
import purgeTestDatabase from '../../src/utils/purgeTestDatabase';

let server: Express;

beforeAll(async () => {
  server = await startServer();
});

afterAll(async () => {
  await purgeTestDatabase();
  await stopServer('Testing Complete');
});

describe('Users Endpoints', () => {
  describe('POST /api/v1/users/register', () => {
    it('should register a new user', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };

      const response = await agent
        .post('/api/v1/users/register')
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toMatchObject({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email.toLowerCase(),
      });
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should not register a new user with existing email', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };

      const response = await agent
        .post('/api/v1/users/register')
        .send(userData);

      expect(response.statusCode).toBe(409);
      expect(response.body.errors[0].message).toEqual(
        'User with entered email already exists'
      );
    });

    it('should not register a new user with invalid form request', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: '',
        lastName: '',
        email: 'invalidEmail',
        password: 'pass',
        confirmPassword: 'password',
      };

      const response = await agent
        .post('/api/v1/users/register')
        .send(userData);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual('First name is required');
      expect(response.body.errors[1].message).toEqual('Last name is required');
      expect(response.body.errors[2].message).toEqual(
        'Must be a valid email address'
      );
      expect(response.body.errors[3].message).toEqual(
        'Password must be between 6 and 255 characters long'
      );
      expect(response.body.errors[4].message).toEqual(
        'Password confirmation does not match password'
      );
    });
  });

  describe('DELETE /api/v1/users/delete-user', () => {
    it('should delete existing authenticated user', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser2@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };
      const userPassword = {
        password: 'testPassword',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);
      response = await agent
        .delete('/api/v1/users/delete-user')
        .send(userPassword);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual(
        'Successfully deleted user account'
      );
    });

    it('should not delete unauthenticated user', async () => {
      const agent = request.agent(server);
      const userPassword = {
        password: 'testPassword',
      };

      const response = await agent
        .delete('/api/v1/users/delete-user')
        .send(userPassword);

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual('Unauthorized');
    });

    it('should not delete a user with incorrect password', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser2@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };
      const userPassword = {
        password: 'wrongPassword',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);
      response = await agent
        .delete('/api/v1/users/delete-user')
        .send(userPassword);

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual('Invalid credentials');
    });

    it('should not delete a user with invalid form request', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser3@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };
      const userPassword = {
        password: '',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);
      response = await agent
        .delete('/api/v1/users/delete-user')
        .send(userPassword);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual(
        'Password must be between 6 and 255 characters long'
      );
    });
  });

  describe('PUT /api/v1/users/change-password', () => {
    it('should update to new password for authenticated user', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser4@example.com',
        password: 'beforeChange',
        confirmPassword: 'beforeChange',
      };
      const changePasswordData = {
        currentPassword: 'beforeChange',
        newPassword: 'afterChange',
        confirmNewPassword: 'afterChange',
      };
      const updatedLoginData = {
        email: 'testUser4@example.com',
        password: 'afterChange',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);
      response = await agent
        .put('/api/v1/users/change-password')
        .send(changePasswordData);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('Password updated successfully');

      response = await agent.post('/api/v1/auth/logout');
      response = await agent.post('/api/v1/auth/login').send(updatedLoginData);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatchObject({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email.toLocaleLowerCase(),
      });
    });

    it('should not update to new ppassword with incorrect current password', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser5@example.com',
        password: 'beforeChange',
        confirmPassword: 'beforeChange',
      };
      const changePasswordData = {
        currentPassword: 'incorrectPassword',
        newPassword: 'afterChange',
        confirmNewPassword: 'afterChange',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);
      response = await agent
        .put('/api/v1/users/change-password')
        .send(changePasswordData);

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual('Invalid credentials');
    });

    it('should not update to new ppassword with invalid form request', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser6@example.com',
        password: 'beforeChange',
        confirmPassword: 'beforeChange',
      };
      const changePasswordData = {
        currentPassword: 'bad',
        newPassword: 'bad',
        confirmNewPassword: 'invalid',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);
      response = await agent
        .put('/api/v1/users/change-password')
        .send(changePasswordData);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual(
        'Password must be between 6 and 255 characters long'
      );
      expect(response.body.errors[1].message).toEqual(
        'New Password must be between 6 and 255 characters long'
      );
      expect(response.body.errors[2].message).toEqual(
        'New password cannot be same as current password'
      );
      expect(response.body.errors[3].message).toEqual(
        'New password confirmation does not match new password'
      );
    });

    it('should not update to new ppassword without active session', async () => {
      const agent = request.agent(server);
      const changePasswordData = {
        currentPassword: 'bad',
        newPassword: 'bad',
        confirmNewPassword: 'invalid',
      };

      const response = await agent
        .put('/api/v1/users/change-password')
        .send(changePasswordData);

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual('Unauthorized');
    });
  });

  describe('PUT /api/v1/users/update-user', () => {
    it('should update account information for authenticated user', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser7@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };
      const updateUserData = {
        firstName: 'updateTestFirst',
        lastName: 'updateTestLast',
        email: 'updateTestUser7@example.com',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);

      response = await agent
        .put('/api/v1/users/update-user')
        .send(updateUserData);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatchObject({
        firstName: updateUserData.firstName,
        lastName: updateUserData.lastName,
        email: updateUserData.email.toLowerCase(),
      });

      response = await agent.get('/api/v1/auth/authenticate');

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatchObject({
        firstName: updateUserData.firstName,
        lastName: updateUserData.lastName,
        email: updateUserData.email.toLowerCase(),
      });
    });

    it('should not update account information for unauthenticated user', async () => {
      const agent = request.agent(server);

      const updateUserData = {
        firstName: 'updateTestFirst',
        lastName: 'updateTestLast',
        email: 'updateTestUser7@example.com',
      };

      const response = await agent
        .put('/api/v1/users/update-user')
        .send(updateUserData);

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual('Unauthorized');
    });

    it('should not update account information with invalid form request', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser8@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };
      const updateUserData = {
        firstName: '',
        lastName: '',
        email: 'invalid',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);
      response = await agent
        .put('/api/v1/users/update-user')
        .send(updateUserData);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual(
        'Must be a valid email address'
      );
    });

    it('should not update account information with empty request body', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser9@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };
      const updateUserData = {
        firstName: '',
        lastName: '',
        email: '',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);
      response = await agent
        .put('/api/v1/users/update-user')
        .send(updateUserData);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual(
        'At least one field is required'
      );
    });

    it('should not update account if all fields are same as previous data', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser10@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };
      const updateUserData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser10@example.com',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);
      response = await agent
        .put('/api/v1/users/update-user')
        .send(updateUserData);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual(
        'At least one field must be different from previous data'
      );
    });

    it('should not update account if email already exists', async () => {
      const agent = request.agent(server);
      const userData = {
        firstName: 'testFirst',
        lastName: 'testLast',
        email: 'testUser11@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };
      const updateUserData = {
        firstName: 'updateTestFirst',
        lastName: 'updateTestLast',
        email: 'testUser10@example.com',
      };

      let response = await agent.post('/api/v1/users/register').send(userData);
      response = await agent
        .put('/api/v1/users/update-user')
        .send(updateUserData);

      expect(response.statusCode).toBe(409);
      expect(response.body.errors[0].message).toEqual(
        'User with entered email already exists'
      );
    });
  });
});
