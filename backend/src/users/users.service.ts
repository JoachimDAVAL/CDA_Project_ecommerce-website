import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Récupère tous les utilisateurs
   */
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.prisma.user.findMany({
      omit: { password: true },
      orderBy: { registrationDate: 'desc' },
    });
  }

  /**
   * Récupère un utilisateur par son ID
   */
  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
      include: {
        artist: true,
        orders: { orderBy: { orderDate: 'desc' } },
        reviews: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!user) {
      throw new NotFoundException(`L'utilisateur avec l'ID ${id} n'existe pas`);
    }

    return user;
  }

  /**
   * Récupère un utilisateur par son email (avec mot de passe, pour l'auth)
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Crée un nouvel utilisateur
   */
  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    const { password, ...rest } = dto;

    const user = await this.prisma.user.create({
      data: {
        ...rest,
        password,
      },
      omit: { password: true },
    });

    return user;
  }

  /**
   * Met à jour les informations d'un utilisateur
   */
  async update(id: number, dto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    await this.findOne(id); // lève une NotFoundException si inexistant

    return this.prisma.user.update({
      where: { id },
      data: dto,
      omit: { password: true },
    });
  }

  /**
   * Supprime un utilisateur
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id); // lève une NotFoundException si inexistant

    await this.prisma.user.delete({ where: { id } });
  }
}
