process.env.NODE_ENV = 'test';

import request from 'supertest';
import app from '../../src/index';
import { prisma } from '../../src/config/database';

describe('Projects API', () => {
  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@test.com',
        password: 'password123',
      });

    authToken = response.body.token;
    userId = response.body.user.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/projects', () => {
    test('should create project successfully', async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test Project' })
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Project');
    });

    test('should return 400 for invalid project name', async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'a' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return 401 without token', async () => {
      await request(app)
        .post('/api/projects')
        .send({ name: 'Test Project' })
        .expect(401);
    });
  });

  describe('GET /api/projects', () => {
    test('should return user projects', async () => {
      await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Project 1' });

      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe('Project 1');
    });
  });

  describe('DELETE /api/projects/:id', () => {
    test('should delete project successfully', async () => {
      const createRes = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'To Delete' });

      const projectId = createRes.body.id;

      await request(app)
        .delete(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const projects = await prisma.project.findMany();
      expect(projects).toHaveLength(0);
    });

    test('should return 404 for non-existent project', async () => {
      await request(app)
        .delete('/api/projects/fake-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});