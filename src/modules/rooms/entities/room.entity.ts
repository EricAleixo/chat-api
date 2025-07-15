import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @ManyToMany(() => User, user => user.adminRooms)
    @JoinTable()
    admins: User[]

    @ManyToMany(() => User, user => user.rooms)
    @JoinTable()
    users: User[]

}
