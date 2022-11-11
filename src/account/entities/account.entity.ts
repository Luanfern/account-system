import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Account{


    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string
    
    @Column()
    password: string
}