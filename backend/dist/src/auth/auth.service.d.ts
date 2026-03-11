import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        user: Omit<{
            email: string;
            password: string;
            username: string;
            registrationDate: Date;
            roles: import(".prisma/client").$Enums.Role[];
            firstName: string | null;
            lastName: string | null;
            profilePicture: string | null;
            defaultAddress: string | null;
            country: string | null;
            id: number;
        }, "password">;
        access_token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            email: string;
            username: string;
            registrationDate: Date;
            roles: import(".prisma/client").$Enums.Role[];
            firstName: string | null;
            lastName: string | null;
            profilePicture: string | null;
            defaultAddress: string | null;
            country: string | null;
            id: number;
        };
        access_token: string;
    }>;
    private signToken;
}
