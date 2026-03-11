import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

const mockUser = {
  id: 1,
  email: 'alice@example.com',
  username: 'alice',
  roles: ['USER'],
  firstName: 'Alice',
  lastName: 'Dupont',
  profilePicture: null,
  defaultAddress: null,
  country: null,
  registrationDate: new Date('2024-01-01'),
};

const mockUserWithPassword = { ...mockUser, password: 'hashed_password' };

const mockPrisma = {
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- findAll ---
  describe('findAll', () => {
    it('retourne la liste des utilisateurs', async () => {
      mockPrisma.user.findMany.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(result).toEqual([mockUser]);
      expect(mockPrisma.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('retourne un tableau vide si aucun utilisateur', async () => {
      mockPrisma.user.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  // --- findOne ---
  describe('findOne', () => {
    it('retourne un utilisateur par son ID', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
    });

    it('lève une NotFoundException si l\'utilisateur est introuvable', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  // --- findByEmail ---
  describe('findByEmail', () => {
    it('retourne un utilisateur par email (avec mot de passe)', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUserWithPassword);

      const result = await service.findByEmail('alice@example.com');

      expect(result).toEqual(mockUserWithPassword);
    });

    it('retourne null si email inconnu', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await service.findByEmail('unknown@example.com');

      expect(result).toBeNull();
    });
  });

  // --- create ---
  describe('create', () => {
    const dto = {
      email: 'bob@example.com',
      password: 'hashed_pw',
      username: 'bob',
    };

    it('crée et retourne un utilisateur', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({ id: 2, ...dto, roles: ['USER'], registrationDate: new Date() });

      const result = await service.create(dto);

      expect(result).toHaveProperty('id', 2);
      expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
    });

    it('lève une ConflictException si l\'email est déjà utilisé', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });
  });

  // --- update ---
  describe('update', () => {
    const dto = { firstName: 'Alicia' };

    it('met à jour et retourne l\'utilisateur modifié', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.update.mockResolvedValue({ ...mockUser, ...dto });

      const result = await service.update(1, dto);

      expect(result.firstName).toBe('Alicia');
      expect(mockPrisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 }, data: dto }),
      );
    });

    it('lève une NotFoundException si l\'utilisateur est introuvable', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.update(99, dto)).rejects.toThrow(NotFoundException);
      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });
  });

  // --- remove ---
  describe('remove', () => {
    it('supprime un utilisateur existant', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.delete.mockResolvedValue(mockUser);

      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('lève une NotFoundException si l\'utilisateur est introuvable', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
      expect(mockPrisma.user.delete).not.toHaveBeenCalled();
    });
  });
});
