import { User } from "src/modules/users/entities/user.entity";
import { DataSourceOptions } from "typeorm";

export const configDB: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "chat_db",
    synchronize: true,
    entities: [
        User
    ]
}