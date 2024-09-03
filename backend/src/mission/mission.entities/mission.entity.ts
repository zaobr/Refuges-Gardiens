import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Organization } from '../../organization/organization.entities/organization.entity';

@Entity({ name: 'mission' })
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  // si on veut mettre une image par défaut si le user n'en upload pas on peut mettre une defaut.jpg en default value
  picture: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  category: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'date' })
  deadline: Date;

  @Column({ type: 'int' })
  numberOfHours: number;

  @Column({ type: 'int' })
  volunteerNumber: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  isDone: boolean;

  @Index()
  @ManyToOne(() => Organization, (organization) => organization.missions)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

}
