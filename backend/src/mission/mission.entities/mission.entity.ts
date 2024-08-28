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
  
    @Column({ type: 'varchar', length: 255 })
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
    
    @Index()
    @ManyToOne(() => Organization, (organization) => organization.missions)
    @JoinColumn({ name: 'organization_id' })
    organization: Organization;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @Column({ type: 'tinyint', width: 1, default: 0 })
    isDone: boolean;
  }
  