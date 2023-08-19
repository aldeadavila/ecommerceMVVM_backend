
import { hash } from "bcrypt";
import { Rol } from "src/roles/rol.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    phone: string;

    @Column({nullable: true})
    image: string;

    @Column()
    password: string;

    @Column({nullable: true})
    notification_token: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    update_at: Date;

    @JoinTable()
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT))
    }
}