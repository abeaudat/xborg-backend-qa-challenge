import { INestApplication, Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { mockSignupRequest, MockUserController } from '../utils/mocks';

@Module({
  controllers: [MockUserController],
})
class TestModule {}

describe('User E2E Testing', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create new user', async () => {
    const testUser = {
      ...mockSignupRequest,
      userName: `test_${Date.now()}`,
      email: `test_${Date.now()}@test.com`,
      address: `0x${Date.now()}`,
    };
    const response = await request(app.getHttpServer())
      .post('/')
      .send({
        pattern: 'SignUp',
        data: testUser,
      });
    expect(response.status).toBe(201);
    expect(response.body.userName).toBe(testUser.userName);
    expect(response.body.email).toBe(testUser.email);
    expect(response.body.address).toBe(testUser.address);
  });

  it('should get user by id', async () => {
    const response = await request(app.getHttpServer())
      .post('/')
      .send({
        pattern: 'GetUser',
        data: { id: 'test-id' },
      });
    expect(response.status).toBe(201);
    expect(response.body.id).toBe('test-id');
  });

  it('should get user by address', async () => {
    const response = await request(app.getHttpServer())
      .post('/')
      .send({
        pattern: 'GetUser',
        data: { address: '0xtest' },
      });
    expect(response.status).toBe(201);
    expect(response.body.address).toBe('0xtest');
  });

  it('should fail creating duplicate user', async () => {
    const duplicateUser = {
      ...mockSignupRequest,
      address: '0xduplicate',
    };
    const response = await request(app.getHttpServer())
      .post('/')
      .send({
        pattern: 'SignUp',
        data: duplicateUser,
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User exists');
  });
}); 