import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entities/user.entity';
import { CreateUserDto } from '../user.dto/create-user.dto';
import { UpdateUserDto } from '../user.dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private readonly usersRepository: Repository<User>,
  ) {}

  // cette route est à adapter avec des conditions WHERE (genre si le user s'est positionné sur une mission) et il faut peut-être rajouter des paramètres
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'firstname', 'lastname']
    });
  }

  async getUser(id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['firstname', 'lastname', 'email', 'city', 'picture', 'banner', 'phoneNumber', 'description', 'organizationName', 'isAdmin', 'isOrganization', 'createdAt'],
      where: [{ id: id }],
    });
  } 

  async getUserById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({ 
      select: ['id', 'firstname', 'lastname', 'email', 'city', 'picture', 'banner', 'phoneNumber', 'description', 'organizationName', 'isAdmin', 'isOrganization'],
      where: [{ id: id }] 
    });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.createQueryBuilder('user')
    .addSelect('user.hashedPassword')
    .addSelect('user.resetPasswordToken')
    .where('user.email = :email', {email})
    .getOne();

    if (!user) {
      return undefined
    }
    return user
  }

  async verifyIfEmailExists(email:string): Promise<boolean> {
    const existingUser = await this.usersRepository.findOne({select: ['email'], where:{email}});
    return !!existingUser; 
  }

    async saveUser(createUserDto: CreateUserDto): Promise<User> {
      // Create an actual User entity from the DTO
      const newUser = this.usersRepository.create(createUserDto);
      
      // Save the user in the database, this will generate the id
      const savedUser = await this.usersRepository.save(newUser);
  
      // Now `savedUser` will have an id
      return savedUser;
  }

  async updateUser(id: number, updateUser: UpdateUserDto): Promise<UpdateUserDto> {
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