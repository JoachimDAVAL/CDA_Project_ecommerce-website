import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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

const mockUsersService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // --- findAll ---
  describe('findAll', () => {
    it('retourne la liste des utilisateurs', async () => {
      mockUsersService.findAll.mockResolvedValue([mockUser]);

      const result = await controller.findAll();

      expect(result).toEqual([mockUser]);
      expect(mockUsersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  // --- findOne ---
  describe('findOne', () => {
    it('retourne un utilisateur par son ID', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne(1);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
    });

    it('propage une NotFoundException si l\'utilisateur est introuvable', async () => {
      mockUsersService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  // --- create ---
  describe('create', () => {
    it('crée et retourne un utilisateur', async () => {
      const dto = { email: 'bob@example.com', password: 'hashed_pw', username: 'bob' };
      const created = { id: 2, ...dto, roles: ['USER'], registrationDate: new Date() };

      mockUsersService.create.mockResolvedValue(created);

      const result = await controller.create(dto);

      expect(result).toEqual(created);
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });
  });

  // --- update ---
  describe('update', () => {
    it('met à jour et retourne l\'utilisateur modifié', async () => {
      const dto = { firstName: 'Alicia' };
      mockUsersService.update.mockResolvedValue({ ...mockUser, ...dto });

      const result = await controller.update(1, dto);

      expect(result.firstName).toBe('Alicia');
      expect(mockUsersService.update).toHaveBeenCalledWith(1, dto);
    });

    it('propage une NotFoundException si l\'utilisateur est introuvable', async () => {
      mockUsersService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update(99, {})).rejects.toThrow(NotFoundException);
    });
  });

  // --- remove ---
  describe('remove', () => {
    it('supprime un utilisateur existant', async () => {
      mockUsersService.remove.mockResolvedValue(undefined);

      await expect(controller.remove(1)).resolves.toBeUndefined();
      expect(mockUsersService.remove).toHaveBeenCalledWith(1);
    });

    it('propage une NotFoundException si l\'utilisateur est introuvable', async () => {
      mockUsersService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});
