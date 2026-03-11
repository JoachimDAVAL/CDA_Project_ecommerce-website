import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
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
    login(loginDto: LoginDto): Promise<{
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
}
