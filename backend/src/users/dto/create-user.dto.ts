import { Role } from '@prisma/client';

export class CreateUserDto {
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
