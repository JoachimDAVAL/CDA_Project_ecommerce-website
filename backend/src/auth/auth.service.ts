import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './strategies/jwt.strategy';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Inscription : hash le mot de passe puis crée l'utilisateur
   */
  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    const token = this.signToken(user.id, user.email, user.roles as string[]);

    return { user, access_token: token };
  }

  /**
   * Connexion : vérifie le mot de passe et retourne un JWT
   */
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = this.signToken(user.id, user.email, user.roles as string[]);

    return { user: userWithoutPassword, access_token: token };
  }

  private signToken(userId: number, email: string, roles: string[]): string {
    const payload: JwtPayload = { sub: userId, email, roles };
    return this.jwtService.sign(payload);
  }
}
