import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../apps/api/src/user/user.controller';
import { UserService } from '../../apps/api/src/user/user.service';
import { UserRepository } from '../../apps/api/src/user/user.repository';
import { mockSignupRequest, mockUser } from '../utils/mocks';

describe('User Controller Unit Testing', () => {
  let userController: UserController;
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    userService = {
      signup: jest.fn().mockResolvedValue(mockUser)
    } as any;

    userRepository = {
      find: jest.fn().mockResolvedValue(mockUser)
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService
        },
        {
          provide: UserRepository,
          useValue: userRepository
        }
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should get user by id', async () => {
    const userId = 'test-id';
    const result = await userController.getUser({ id: userId });
    expect(userRepository.find).toHaveBeenCalledWith({ id: userId });
    expect(result).toEqual(mockUser);
  });

  it('should get user by address', async () => {
    const userAddress = '0xAddress';
    const result = await userController.getUser({ address: userAddress });
    expect(userRepository.find).toHaveBeenCalledWith({ address: userAddress });
    expect(result).toEqual(mockUser);
  });

  it('should create new user', async () => {
    const result = await userController.signup(mockSignupRequest);
    expect(userService.signup).toHaveBeenCalledWith(mockSignupRequest);
    expect(result).toEqual(mockUser);
  });
}); 