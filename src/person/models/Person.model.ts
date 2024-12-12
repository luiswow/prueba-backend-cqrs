import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Person {
    @Column()
    @PrimaryColumn()
    personId: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    country: string;

}