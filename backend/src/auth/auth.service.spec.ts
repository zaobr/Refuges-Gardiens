import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from './hashing.service';
import { UserService } from '../user/user.services/user.service';
import { User } from '../user/user.entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: Partial<UserService>;
  let hashingService: Partial<HashingService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    userService = {
      getUserByEmail: jest.fn(),
    };
    hashingService = {
      compare: jest.fn(),
      hash: jest.fn(),
    };
    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn(),
            saveUser: jest.fn(),
          },
        },
        {
          provide: HashingService,
          useValue: {
            saltRounds: 10,
            hashPassword: jest.fn(),
            comparePassword: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: jwtService
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    hashingService = module.get<HashingService>(HashingService);
    jwtService = module.get<JwtService>(JwtService);
  });

  
  describe('login', () => {
    it('should return access token for valid user with correct password', async () => {
      const mockHashingService = new HashingService();
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.firstname = "Antoine";
      mockUser.lastname = "Dupont";
      mockUser.email = "antoine.dupont@mail.com";
      mockUser.hashed_password = await mockHashingService.hash('correctPassword')
      mockUser.city = "Toulouse";
      mockUser.picture = "";
      mockUser.banner = "";
      mockUser.phone_number = "0606754534";
      mockUser.description = "";
      mockUser.is_admin = false;
      mockUser.is_organization = false;
      mockUser.organization_name = null;

      (userService.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (hashingService.compare as jest.Mock).mockResolvedValue(true);
      (jwtService.sign as jest.Mock).mockReturnValue('fakeToken');

      const result = await authService.login('antoine.dupont@mail.com', 'correctPassword');
      expect(result).toEqual({
        expires_in: 3600,
        access_token: 'fakeToken',
      });
    });

    it('should return status 404 if user not found', async () => {
      (userService.getUserByEmail as jest.Mock).mockResolvedValue(null);

      const result = await authService.login('non.existent@mail.com', 'anyPassword');
      expect(result).toEqual({ status: 404, message: 'User not found' });
    });

    it('should return status 404 for incorrect password', async () => {
      const mockHashingService = new HashingService();
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.firstname = "Antoine";
      mockUser.lastname = "Dupont";
      mockUser.email = "antoine.dupont@mail.com";
      mockUser.hashed_password = await mockHashingService.hash('correctPassword');
      mockUser.city = "Toulouse";
      mockUser.picture = "";
      mockUser.banner = "";
      mockUser.phone_number = "0606754534";
      mockUser.description = "";
      mockUser.is_admin = false;
      mockUser.is_organization = false;
      mockUser.organization_name = null;

      (userService.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (hashingService.compare as jest.Mock).mockResolvedValue(false);

      const result = await authService.login('antoine.dupont@mail.com', 'wrongPassword');
      expect(result).toEqual({ status: 404, message: 'Incorrect password' });
    });

    it('should handle errors and return status 404', async () => {
      (userService.getUserByEmail as jest.Mock).mockRejectedValue(new Error('Service error'));

      const result = await authService.login('error@mail.com', 'anyPassword');
      expect(result).toEqual({ status: 404 });
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const mockUser = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        hashed_password: 'hashedpassword',
      };

      (userService.getUserByEmail as jest.Mock).mockResolvedValue(undefined);
      (hashingService.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (userService.saveUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.register('John', 'Doe', 'john.doe@example.com', 'password');

      expect(result).toEqual({
        firstname: mockUser.firstname,
        lastname: mockUser.lastname,
        email: mockUser.email,
      });
    });

    it('should throw an error if email is already taken', async () => {
      const existingUser = new User();
      existingUser.email = 'john.doe@mail.com';
      (userService.getUserByEmail as jest.Mock).mockResolvedValue(existingUser);

      await expect(authService.register('John', 'Doe', 'john.doe@mail.com', 'password'))
        .rejects
        .toThrow('Email already taken');
    });

    it('should throw an error if a field is missing', async () => {
      await expect(authService.register('', 'Doe', 'john.doe@mail.com', 'password'))
        .rejects
        .toThrow('Registration failed');
    });

    it('should throw an error if registration fails', async () => {
      (userService.getUserByEmail as jest.Mock).mockResolvedValue(undefined);
      (hashingService.hash as jest.Mock).mockRejectedValue(new Error('Hashing failed'));

      await expect(authService.register('John', 'Doe', 'john.doe@mail.com', 'password'))
        .rejects
        .toThrow('Registration failed');
    });
  });
});

