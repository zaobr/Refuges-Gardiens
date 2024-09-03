import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    Index,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { Mission } from '../../mission/mission.entities/mission.entity'
import { User } from '../../user/user.entities/user.entity';

@Entity({ name: 'organization' })
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @OneToOne(() => User, (user) => user.organization)
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
