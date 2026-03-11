import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Omit<{
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
    }, "password">[]>;
    findOne(id: number): Promise<Omit<{
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
    }, "password">>;
    create(createUserDto: CreateUserDto): Promise<Omit<{
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
    }, "password">>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<{
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
    }, "password">>;
    remove(id: number): Promise<void>;
}
