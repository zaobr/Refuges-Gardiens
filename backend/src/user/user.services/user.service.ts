import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // cette route est à adapter avec des conditions WHERE (genre si le user s'est positionné sur une mission) et il faut peut-être rajouter des paramètres
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'firstname', 'lastname', 'hashedPassword']
    });
  }

  async getUser(id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['firstname', 'lastname', 'email', 'city', 'picture', 'banner', 'phone_number', 'description', 'organization_name', 'is_admin', 'is_organization'],
      where: [{ id: id }],
    });
  } 

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email: email });
  }

  saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, updateUser: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: Number(id) } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = { ...user, ...updateUser };
    return this.usersRepository.save(updatedUser);
  }

  deleteUser(id: number): void {
    this.usersRepository.delete(id);
  }
}