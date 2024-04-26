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

describe('Littlethings Endpoints', () => {
  describe('POST /api/v1/littlethings/create-post', () => {
    it('should create a littlethings post for the authenticated user', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'test description',
        littlething: 'test littlethings',
        frequency: 'Weekly',
        occurrence: 1,
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toMatchObject({
        id: expect.any(String),
        description: postData.description,
        littlething: postData.littlething,
        frequency: postData.frequency,
        occurrence: postData.occurrence,
        completionCount: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should not create a littlethings post for a user without active session', async () => {
      const agent = request.agent(server);
      const postData = {
        description: 'test description',
        littlething: 'test littlethings',
        frequency: 'Weekly',
        occurrence: 1,
      };

      const response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual('Unauthorized');
    });

    it('should not create a littlethings post with invalid form request', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: '',
        littlething: '',
        frequency: 'invalid',
        occurrence: 0,
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual(
        'Description is required'
      );
      expect(response.body.errors[1].message).toEqual(
        'Little Thing is required'
      );
      expect(response.body.errors[2].message).toEqual(
        'Frequency must be one of the following: Daily, Weekly, Monthly, Yearly'
      );
      expect(response.body.errors[3].message).toEqual(
        'Occurrence must be an integer and at least 1'
      );
    });
  });

  describe('GET /api/v1/littlethings/get-all-posts', () => {
    it('should get all littlethings posts created by the authenticated user', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'test description',
        littlething: 'test littlethings',
        frequency: 'Weekly',
        occurrence: 1,
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent.get('/api/v1/littlethings/get-all-posts');

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toHaveLength(1);
      expect(response.body.message[0]).toMatchObject({
        id: expect.any(String),
        description: postData.description,
        littlething: postData.littlething,
        frequency: postData.frequency,
        occurrence: postData.occurrence,
        completionCount: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should not get all littlethings posts for a user without active session', async () => {
      const agent = request.agent(server);

      const response = await agent.get('/api/v1/littlethings/get-all-posts');

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual('Unauthorized');
    });
  });

  describe('POST /api/v1/littlethings/:id', () => {
    it('should update a post created by the authenticated user', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'before update',
        littlething: 'before update',
        frequency: 'Daily',
        occurrence: 1,
      };
      const updatePostData = {
        description: 'after update',
        littlething: 'after update',
        frequency: 'Weekly',
        occurrence: 2,
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);
      const postId = response.body.message.id;
      response = await agent
        .post(`/api/v1/littlethings/${postId}`)
        .send(updatePostData);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatchObject({
        id: postId,
        description: updatePostData.description,
        littlething: updatePostData.littlething,
        frequency: updatePostData.frequency,
        occurrence: updatePostData.occurrence,
        completionCount: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should not update a post created by a different user', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const otherUserData = {
        firstName: 'otherUserFirst',
        lastName: 'otherUserLast',
        email: 'otherTestUser@example.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };
      const postData = {
        description: 'before update',
        littlething: 'before update',
        frequency: 'Daily',
        occurrence: 1,
      };
      const updatePostData = {
        description: 'after update',
        littlething: 'after update',
        frequency: 'Weekly',
        occurrence: 2,
      };

      let otherUserResponse = await agent
        .post('/api/v1/users/register')
        .send(otherUserData);
      otherUserResponse = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);
      const otherUserPostId = otherUserResponse.body.message.id;

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post(`/api/v1/littlethings/${otherUserPostId}`)
        .send(updatePostData);

      expect(response.statusCode).toBe(403);
      expect(response.body.errors[0].message).toEqual(
        'Not authorized to update this post'
      );
    });

    it('should not update a post if post is not found', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'before update',
        littlething: 'before update',
        frequency: 'Daily',
        occurrence: 1,
      };
      const updatePostData = {
        description: 'after update',
        littlething: 'after update',
        frequency: 'Weekly',
        occurrence: 2,
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);
      const postId = response.body.message.id;
      response = await agent.delete(`/api/v1/littlethings/${postId}`);
      response = await agent
        .post(`/api/v1/littlethings/${postId}`)
        .send(updatePostData);

      expect(response.statusCode).toBe(404);
      expect(response.body.errors[0].message).toEqual(
        'Cannot find the post or the post is already deleted'
      );
    });

    it('should not update a post for a user without active session', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'before update',
        littlething: 'before update',
        frequency: 'Daily',
        occurrence: 1,
      };
      const updatePostData = {
        description: 'after update',
        littlething: 'after update',
        frequency: 'Weekly',
        occurrence: 2,
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);
      const postId = response.body.message.id;
      response = await agent.post('/api/v1/auth/logout');
      response = await agent
        .post(`/api/v1/littlethings/${postId}`)
        .send(updatePostData);

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual('Unauthorized');
    });

    it('should not update a post with invalid form request', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'before update',
        littlething: 'before update',
        frequency: 'Daily',
        occurrence: 1,
      };
      const updatePostData = {
        description: 'after update',
        littlething: 'after update',
        frequency: 'invalid',
        occurrence: 'invalid',
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);
      const postId = response.body.message.id;
      response = await agent
        .post(`/api/v1/littlethings/${postId}`)
        .send(updatePostData);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual(
        'Frequency must be one of the following: Daily, Weekly, Monthly, Yearly'
      );
      expect(response.body.errors[1].message).toEqual(
        'Occurrence must be an integer and at least 1'
      );
    });

    it('should not update a post with empty request', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'before update',
        littlething: 'before update',
        frequency: 'Daily',
        occurrence: 1,
      };
      const updatePostData = {};

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);
      const postId = response.body.message.id;
      response = await agent
        .post(`/api/v1/littlethings/${postId}`)
        .send(updatePostData);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual(
        'Must provide at least 1 field to update'
      );
    });
  });

  describe('DELETE /api/v1/littlethings/:id', () => {
    it('should delete a littlethings post for the authenticated user', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'test description',
        littlething: 'test littlethings',
        frequency: 'Weekly',
        occurrence: 1,
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);
      const postId = response.body.message.id;
      response = await agent.delete(`/api/v1/littlethings/${postId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual(postId);
    });

    it('should return not found error if post is not found', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'before update',
        littlething: 'before update',
        frequency: 'Daily',
        occurrence: 1,
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);
      const postId = response.body.message.id;
      response = await agent.delete(`/api/v1/littlethings/${postId}`);
      response = await agent.delete(`/api/v1/littlethings/${postId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.errors[0].message).toEqual(
        'Cannot find the post or the post is already deleted'
      );
    });

    it('should not delete a littlethings post for a user without active session', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'before update',
        littlething: 'before update',
        frequency: 'Daily',
        occurrence: 1,
      };

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);
      const postId = response.body.message.id;
      response = await agent.post('/api/v1/auth/logout');
      response = await agent.delete(`/api/v1/littlethings/${postId}`);

      expect(response.statusCode).toBe(401);
      expect(response.body.errors[0].message).toEqual('Unauthorized');
    });

    it('should not delete a post created by a different user', async () => {
      const agent = request.agent(server);
      const userData = {
        email: 'testUser@example.com',
        password: 'testPassword',
      };
      const otherUserData = {
        email: 'otherTestUser@example.com',
        password: 'testPassword',
      };
      const postData = {
        description: 'before update',
        littlething: 'before update',
        frequency: 'Daily',
        occurrence: 1,
      };

      let otherUserResponse = await agent
        .post('/api/v1/auth/login')
        .send(otherUserData);
      otherUserResponse = await agent
        .post('/api/v1/littlethings/create-post')
        .send(postData);
      const otherUserPostId = otherUserResponse.body.message.id;

      let response = await agent.post('/api/v1/auth/login').send(userData);
      response = await agent.delete(`/api/v1/littlethings/${otherUserPostId}`);

      expect(response.statusCode).toBe(403);
      expect(response.body.errors[0].message).toEqual(
        'Not authorized to delete this post'
      );
    });
  });
});
