import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    firstname: string;

    @Column({ type: "varchar", length: 255 })
    lastname: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255 })
    hashedPassword: string;

    @Column({ type: "varchar", length: 255, default: "" })
    city: string;
    
    @Column({ type: "varchar", length: 255, nullable: true })
    picture: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    banner: string;

    @Column({ type: "varchar", length: 10, default: "" })
    phone_number: string;

    @Column({type: "text", nullable: true})
    description: string;

    @Column({type: "boolean", default: false})
    is_admin:boolean;

    @Column({type: "boolean", default: false})
    is_organization:boolean;

    @Column({ type: "varchar", length: 255, nullable: true })
    organization_name:string;

    @Column({ nullable: true })
    resetPasswordToken: string;

    @Column({ type: 'timestamp', nullable: true })
    resetPasswordExpires: Date;
}