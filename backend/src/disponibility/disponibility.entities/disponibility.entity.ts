import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Disponibility {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    available_at: Date;

    @Column()
    user_id: number;

    @Column({ type: 'date' })
    created_at: Date;

    @Column({ type: 'date' })
    updated_at: Date;

}