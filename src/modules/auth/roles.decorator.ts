import { SetMetadata } from "@nestjs/common"
import { rolesUse } from "../users/entities/user.entity"

export const ROLES_KEY = "roles"
export const Roles = (...roles: rolesUse[]) => SetMetadata(ROLES_KEY, roles)