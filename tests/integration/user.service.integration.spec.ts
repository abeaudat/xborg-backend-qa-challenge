import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../apps/api/src/user/user.service';
import { UserRepository } from '../../apps/api/src/user/user.repository';
import { PrismaService } from '../../apps/api/src/prisma/prisma.service';
import { mockSignupRequest } from '../utils/mocks';

describe('User Service Integration Testing', () => {
  let userService: UserService;
  let userRepository: any;
  let prismaService: any;

  beforeAll(async () => {
    userRepository = {
      find: jest.fn(),
      create: jest.fn()
    };

    prismaService = {
      user: {
        findUniqueOrThrow: jest.fn(),
        create: jest.fn()
      },
      $disconnect: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: userRepository
        },
        {
          provide: PrismaService,
          useValue: prismaService
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should create new user successfully', async () => {
    const testUser = {
      id: 'test-id',
      userName: `test_${Date.now()}`,
      address: `0x${Date.now()}`,
      email: `test_${Date.now()}@test.com`,
      profile: {
        id: 'profile-id',
        firstName: mockSignupRequest.firstName,
        lastName: mockSignupRequest.lastName,
        location: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    userRepository.create.mockResolvedValueOnce(testUser);
    const result = await userService.signup(mockSignupRequest);

    expect(result).toBeDefined();
    expect(result.userName).toBe(testUser.userName);
    expect(result.email).toBe(testUser.email);
    expect(result.address).toBe(testUser.address);
    expect(result.profile.firstName).toBe(mockSignupRequest.firstName);
    expect(result.profile.lastName).toBe(mockSignupRequest.lastName);
  });

  it('should fail when creating user with existing address', async () => {
    userRepository.create.mockRejectedValueOnce(new Error('User exists'));
    await expect(userService.signup(mockSignupRequest))
      .rejects
      .toThrow('User exists');
  });
}); 