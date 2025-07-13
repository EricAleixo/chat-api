import { rolesUse } from "src/modules/users/entities/user.entity";

export class CreateAuthDto {
    email: string;
    username: string;
    number: string;
    password: string;
    role: rolesUse[]
}
