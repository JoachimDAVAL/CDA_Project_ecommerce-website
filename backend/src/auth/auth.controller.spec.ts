import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockAuthResponse = {
  user: {
    id: 1,
    email: 'alice@example.com',
    username: 'alice',
    roles: ['USER'],
    firstName: 'Alice',
    lastName: 'Dupont',
    registrationDate: new Date('2024-01-01'),
  },
  access_token: 'mock.jwt.token',
};

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // --- register ---
  describe('register', () => {
    const dto = { email: 'alice@example.com', password: 'plaintext', username: 'alice' };

    it('délègue au service et retourne user + access_token', async () => {
      mockAuthService.register.mockResolvedValue(mockAuthResponse);

      const result = await controller.register(dto);

      expect(result).toEqual(mockAuthResponse);
      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
    });

    it('propage une ConflictException si l\'email est déjà utilisé', async () => {
      mockAuthService.register.mockRejectedValue(new ConflictException());

      await expect(controller.register(dto)).rejects.toThrow(ConflictException);
    });
  });

  // --- login ---
  describe('login', () => {
    const dto = { email: 'alice@example.com', password: 'plaintext' };

    it('délègue au service et retourne user + access_token', async () => {
      mockAuthService.login.mockResolvedValue(mockAuthResponse);

      const result = await controller.login(dto);

      expect(result).toEqual(mockAuthResponse);
      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
    });

    it('propage une UnauthorizedException si les credentials sont invalides', async () => {
      mockAuthService.login.mockRejectedValue(new UnauthorizedException());

      await expect(controller.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
