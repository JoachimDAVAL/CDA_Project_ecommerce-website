import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

const mockUserWithPassword = {
  id: 1,
  email: 'alice@example.com',
  username: 'alice',
  password: 'hashed_password',
  roles: ['USER'],
  firstName: 'Alice',
  lastName: 'Dupont',
  profilePicture: null,
  defaultAddress: null,
  country: null,
  registrationDate: new Date('2024-01-01'),
};

const mockUserWithoutPassword = (() => {
  const { password: _, ...rest } = mockUserWithPassword;
  return rest;
})();

const mockUsersService = {
  create: jest.fn(),
  findByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mock.jwt.token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- register ---
  describe('register', () => {
    const dto = { email: 'alice@example.com', password: 'plaintext', username: 'alice' };

    it('hash le mot de passe et retourne user + access_token', async () => {
      mockUsersService.create.mockResolvedValue(mockUserWithoutPassword);

      const result = await service.register(dto);

      // Le mot de passe transmis à create doit être hashé (pas le plaintext)
      const calledWith = mockUsersService.create.mock.calls[0][0];
      expect(calledWith.password).not.toBe('plaintext');
      expect(await bcrypt.compare('plaintext', calledWith.password)).toBe(true);

      expect(result).toHaveProperty('access_token', 'mock.jwt.token');
      expect(result.user).toEqual(mockUserWithoutPassword);
      expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
    });

    it('propage une ConflictException si l\'email est déjà utilisé', async () => {
      mockUsersService.create.mockRejectedValue(new ConflictException());

      await expect(service.register(dto)).rejects.toThrow(ConflictException);
    });
  });

  // --- login ---
  describe('login', () => {
    it('retourne user + access_token si les credentials sont valides', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUserWithPassword);
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(true as never);

      const result = await service.login({ email: 'alice@example.com', password: 'plaintext' });

      expect(result).toHaveProperty('access_token', 'mock.jwt.token');
      expect(result.user).not.toHaveProperty('password');
      expect(result.user.email).toBe('alice@example.com');
    });

    it('lève UnauthorizedException si l\'email est inconnu', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({ email: 'inconnu@example.com', password: 'plaintext' }),
      ).rejects.toThrow(UnauthorizedException);

      expect(mockJwtService.sign).not.toHaveBeenCalled();
    });

    it('lève UnauthorizedException si le mot de passe est incorrect', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUserWithPassword);
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(false as never);

      await expect(
        service.login({ email: 'alice@example.com', password: 'mauvais' }),
      ).rejects.toThrow(UnauthorizedException);

      expect(mockJwtService.sign).not.toHaveBeenCalled();
    });
  });
});
