import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from '../user.entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HashingService } from '../../auth/hashing.service';
import { ResetTokenService } from '../../auth/reset-token.service';

describe('UserService', () => {
  let userService: UserService;
  let usersRepository: Repository<User>;
  let hashingService: HashingService;
  let resetTokenService: ResetTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // This is the repository mock
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn(), // Mock the hash function
          },
        },
        {
          provide: ResetTokenService,
          useValue: {
            resetTokenGenerator: jest.fn(), // Mock the resetTokenGenerator function
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    hashingService = module.get<HashingService>(HashingService);
    resetTokenService = module.get<ResetTokenService>(ResetTokenService);
  });

  it('should generate, hash, and save a reset token for an existing user', async () => {
    const email = 'test@example.com';
    const mockUser = { id: 1, email } as User;
    const plainToken = 'plain-reset-token';
    const hashedToken = 'hashed-reset-token';

    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(mockUser);
    jest.spyOn(resetTokenService, 'resetTokenGenerator').mockResolvedValue(plainToken);
    jest.spyOn(hashingService, 'hash').mockResolvedValue(hashedToken);
    jest.spyOn(usersRepository, 'save').mockResolvedValue(mockUser);

    const result = await resetTokenService.resetTokenGenerator();

    expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { email } });
    expect(resetTokenService.resetTokenGenerator).toHaveBeenCalled();
    expect(hashingService.hash).toHaveBeenCalledWith(plainToken);
    expect(usersRepository.save).toHaveBeenCalledWith({
      ...mockUser,
      resetPasswordToken: hashedToken,
      resetPasswordExpires: expect.any(Date),
    });
    expect(result).toBe(plainToken);
  });

  it('should throw an error if the user is not found', async () => {
    const email = 'notfound@example.com';
    const mockUser = { id: 1, email } as User;

    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);

    await expect(resetTokenService.resetTokenGenerator()).rejects.toThrow('User not found');

    expect(usersRepository.findOne).toHaveBeenCalledWith({ where: { email } });
  });
});
