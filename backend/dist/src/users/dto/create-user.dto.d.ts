import { Role } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    password: string;
    username: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    defaultAddress?: string;
    country?: string;
    roles?: Role[];
}
