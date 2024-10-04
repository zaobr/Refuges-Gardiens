import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany
} from 'typeorm';
import { Organization } from '../../organization/organization.entities/organization.entity';
import { Application } from '../../application/application.entities/application.entity';

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

    @Column({ type: "varchar", length: 255, select: false } )
    hashed_password: string;

    @Column({ type: "varchar", length: 255, default: "" })
    city: string;
    
    @Column({ type: "varchar", length: 255, nullable: true })
    picture: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    banner: string;

    @Column({ type: "varchar", length: 10, default: "" })
    phone_number: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "boolean", default: false })
    is_admin: boolean;

    @Column({ type: "boolean", default: false })
    is_organization: boolean;

    @Column({ type: "varchar", length: 255, nullable: true })
    organization_name: string;

    @Column({ nullable: true, select: false })
    reset_password_token: string;

    @Column({ type: 'timestamp', nullable: true })
    reset_password_expires: Date;

    @OneToOne(() => Organization, (organization) => organization.user)
    organization: Organization;

    @OneToMany(() => Application, (application) => application.user)
    application: Application[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date; //changer en timestamp

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}