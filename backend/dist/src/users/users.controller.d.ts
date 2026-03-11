import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Omit<{
        id: number;
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
    }, "password">[]>;
    findOne(id: number): Promise<Omit<{
        id: number;
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
    }, "password">>;
    create(createUserDto: CreateUserDto): Promise<Omit<{
        id: number;
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
    }, "password">>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<{
        id: number;
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
    }, "password">>;
    remove(id: number): Promise<void>;
}
