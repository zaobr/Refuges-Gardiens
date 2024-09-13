import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disponibility } from '../disponibility.entities/disponibility.entity';

@Injectable()
export class DisponibilityService {
  constructor(
    @InjectRepository(Disponibility) private disponibilitiesRepository: Repository<Disponibility>,
  ) {}


  // Récupération des données

  async getDisponibilities(): Promise<Disponibility[]> {
    return await this.disponibilitiesRepository.find({
      select: ['id', 'available_at', 'user_id', 'created_at', 'updated_at']
    });
  }

    async getDisponibility(id: number): Promise<Disponibility[]> {
      const getdispoID = await this.disponibilitiesRepository.findOne({ where: { id: Number(id) } });
    
      if (!getdispoID) {
        throw new NotFoundException(`Disponibility with ID ${id} not found`);
      }
      return await this.disponibilitiesRepository.find({
        select: ['id','available_at', 'user_id', 'created_at', 'updated_at'],
        where: [{ id: id }],
      });
    }


// Créaton des données

  saveDisponibility(disponibility: Disponibility): Promise<Disponibility> {
    return this.disponibilitiesRepository.save(disponibility);
  }


  // Mise à jour entière des données

  async updateDisponibility(id: number, updateDisponibility: Partial<Disponibility>): Promise<Disponibility> {
    const disponibility = await this.disponibilitiesRepository.findOne({ where: { id: Number(id) } });
    if (!disponibility) {
      throw new NotFoundException(`Disponibility with ID ${id} not found`);
    }
    const updatedDisponibility = { ...disponibility, ...updateDisponibility };
    return this.disponibilitiesRepository.save(updatedDisponibility);
  }


  // Suppression des données

  async deleteDisponibility(id: number, deleteDisponibility: Partial<Disponibility>) {
    const deletedispoID = await this.disponibilitiesRepository.findOne({ where: { id: Number(id)}})
      if (!deletedispoID) {
        throw new NotFoundException(`Disponibility with ID ${id} not found`);
      }
    this.disponibilitiesRepository.delete(id);
    return `Deletion complete`; 
  }
}
