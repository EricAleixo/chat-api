import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Room } from "../../rooms/entities/room.entity";

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

    @ManyToMany(() => Room, room => room.admins)
    adminRooms: Room[]
    
    @ManyToMany(() => Room, room => room.users)
    rooms: Room[];
}
