import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../apps/api/src/user/user.repository';
import { PrismaService } from '../../apps/api/src/prisma/prisma.service';
import { mockCreateUser, mockUser } from '../utils/mocks';

describe('User Repository Unit Testing', () => {
  let userRepository: UserRepository;
  let prismaService: any;

  beforeEach(async () => {
    prismaService = {
      user: {
        findUniqueOrThrow: jest.fn().mockResolvedValue(mockUser),
        create: jest.fn().mockResolvedValue(mockUser)
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should find user by id', async () => {
    const userId = 'test-id';
    const result = await userRepository.find({ id: userId });
    expect(prismaService.user.findUniqueOrThrow).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it('should find user by address', async () => {
    const userAddress = '0xAddress';
    const result = await userRepository.find({ address: userAddress });
    expect(prismaService.user.findUniqueOrThrow).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it('should create new user', async () => {
    const result = await userRepository.create(mockCreateUser);
    expect(prismaService.user.create).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it('should fail when user not found', async () => {
    prismaService.user.findUniqueOrThrow.mockRejectedValue(new Error('Not found'));
    await expect(userRepository.find({ id: 'bad-id' }))
      .rejects
      .toThrow();
  });

  it('should fail when creating duplicate user', async () => {
    const error = new Error('Duplicate') as any;
    error.code = 'P2002';
    prismaService.user.create.mockRejectedValue(error);
    await expect(userRepository.create(mockCreateUser))
      .rejects
      .toThrow('User exists');
  });
}); 