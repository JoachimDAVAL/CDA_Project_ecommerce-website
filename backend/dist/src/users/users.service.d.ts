import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Omit<User, 'password'>[]>;
    findOne(id: number): Promise<Omit<User, 'password'>>;
    findByEmail(email: string): Promise<User | null>;
    create(dto: CreateUserDto): Promise<Omit<User, 'password'>>;
    update(id: number, dto: UpdateUserDto): Promise<Omit<User, 'password'>>;
    remove(id: number): Promise<void>;
}
