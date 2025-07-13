import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum rolesUse{
    basic = "basic",
    admin = "admin"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    password: string;

    @Column({unique: true})
    number: string;

    @Column("simple-array", {default: [rolesUse.basic]})
    role: rolesUse[];

}
