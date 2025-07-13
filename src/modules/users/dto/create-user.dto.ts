import { rolesUse } from "../entities/user.entity";

export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    number: string;
    role: rolesUse[]
}
