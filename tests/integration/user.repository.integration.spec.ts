import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../apps/api/src/user/user.repository';
import { PrismaService } from '../../apps/api/src/prisma/prisma.service';
import { mockCreateUser } from '../utils/mocks';

describe('User Repository Integration Testing', () => {
  let userRepository: UserRepository;
  let prismaService: any;

  beforeAll(async () => {
    prismaService = {
      user: {
        findUniqueOrThrow: jest.fn(),
        create: jest.fn()
      },
      $disconnect: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: prismaService
        }
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should create and find user by id', async () => {
    const testUser = {
      id: 'test-id',
      userName: `test_${Date.now()}`,
      address: `0x${Date.now()}`,
      email: `test_${Date.now()}@test.com`,
      profile: {
        id: 'profile-id',
        firstName: 'Test',
        lastName: 'User',
        location: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    prismaService.user.create.mockResolvedValue(testUser);
    prismaService.user.findUniqueOrThrow.mockResolvedValue(testUser);

    const created = await userRepository.create(mockCreateUser);
    expect(created).toEqual(testUser);

    const found = await userRepository.find({ id: testUser.id });
    expect(found).toEqual(testUser);
  });

  it('should create and find user by address', async () => {
    const testUser = {
      id: 'test-id-2',
      userName: `test_${Date.now()}`,
      address: `0x${Date.now()}`,
      email: `test_${Date.now()}@test.com`,
      profile: {
        id: 'profile-id-2',
        firstName: 'Test',
        lastName: 'User',
        location: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    prismaService.user.create.mockResolvedValue(testUser);
    prismaService.user.findUniqueOrThrow.mockResolvedValue(testUser);

    const created = await userRepository.create(mockCreateUser);
    expect(created).toEqual(testUser);

    const found = await userRepository.find({ address: testUser.address });
    expect(found).toEqual(testUser);
  });

  it('should fail finding non-existent user', async () => {
    prismaService.user.findUniqueOrThrow.mockRejectedValue(new Error('Not found'));
    await expect(userRepository.find({ id: 'bad-id' })).rejects.toThrow();
  });

  it('should fail creating duplicate user', async () => {
    const error = new Error('Unique constraint failed') as any;
    error.code = 'P2002';
    prismaService.user.create.mockRejectedValue(error);
    await expect(userRepository.create(mockCreateUser)).rejects.toThrow('User exists');
  });
}); 