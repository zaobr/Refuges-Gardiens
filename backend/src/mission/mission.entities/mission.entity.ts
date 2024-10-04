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
import { Organization } from '../../organization/organization.entities/organization.entity';
import { Application } from '../../application/application.entities/application.entity';

@Entity({ name: 'mission' })
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
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
  number_of_hours: number;

  @Column({ type: 'int' })
  volunteer_number: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  is_done: boolean;

  @Index()
  @ManyToOne(() => Organization, (organization) => organization.missions)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @OneToMany(() => Application, (application) => application.mission)
  application: Application[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

}
