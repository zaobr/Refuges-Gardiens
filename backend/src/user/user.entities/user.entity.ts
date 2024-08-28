import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'user' })
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
    phoneNumber: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "boolean", default: false })
    isAdmin: boolean;

    @Column({ type: "boolean", default: false })
    isOrganization: boolean;

    @Column({ type: "varchar", length: 255, nullable: true })
    organizationName: string;

    @Column({ nullable: true })
    resetPasswordToken: string;

    @Column({ type: 'timestamp', nullable: true })
    resetPasswordExpires: Date;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}