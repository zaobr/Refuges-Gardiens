import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    Index,
    ManyToOne,
} from 'typeorm';
import { Mission } from '../../mission/mission.entities/mission.entity'
import { User } from '../../user/user.entities/user.entity';

@Entity({ name: 'application'})
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'tinyint', width: 1, default: 0})
    is_accepted: boolean;

    @Index({ unique: true })
    @ManyToOne(() => User, (user) => user.application)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Index({ unique: true })
    @ManyToOne(() => Mission, (mission) => mission.application)
    @JoinColumn({ name: 'mission_id' })
    mission: Mission;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}