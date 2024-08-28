import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
    OneToMany,
} from 'typeorm';
import { User } from '../../user/user.entities/user.entity';
import { Mission } from '../../mission/mission.entities/mission.entity'

@Entity({ name: 'organization' })
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @ManyToOne(() => User, (user) => user.isOrganization)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'tinyint', width: 1, default: 0 })
    isVerified: boolean;

    @OneToMany(() => Mission, (mission) => mission.organization)
    missions: Mission[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
