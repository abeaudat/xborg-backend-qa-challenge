import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../apps/api/src/user/user.service';
import { UserRepository } from '../../apps/api/src/user/user.repository';
import { mockSignupRequest, mockUser } from '../utils/mocks';

describe('User Service Unit Testing', () => {
  let userService: UserService;
  let userRepository: any;

  beforeEach(async () => {
    userRepository = {
      find: jest.fn().mockResolvedValue(mockUser),
      create: jest.fn().mockResolvedValue(mockUser)
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should create user successfully', async () => {
    const result = await userService.signup(mockSignupRequest);
    expect(userRepository.create).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it('should fail when repository throws error', async () => {
    const error = new Error('Test error');
    userRepository.create.mockRejectedValueOnce(error);
    await expect(userService.signup(mockSignupRequest))
      .rejects
      .toThrow(error);
  });
}); 