import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entities/user.entity';
import { CreateUserDto } from '../user.dto/create-user.dto';
import { UpdateUserDto } from '../user.dto/update-user.dto';
import { UserDto } from '../user.dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  // cette route est à adapter avec des conditions WHERE (genre si le user s'est positionné sur une mission) et il faut peut-être rajouter des paramètres
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'firstname', 'lastname']
    });
  }

  async getUser(id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['firstname', 'lastname', 'email', 'city', 'picture', 'banner', 'phone_number', 'description', 'organization_name', 'is_admin', 'is_organization', 'created_at'],
      where: [{ id: id }],
    });
  }

  async getUserById(id: number): Promise<UserDto | undefined> {
    const user = await this.usersRepository.findOne({
      select: ['id', 'firstname', 'lastname', 'email', 'city', 'picture', 'banner', 'phone_number', 'description', 'organization_name', 'is_admin', 'is_organization'],
      where: [{ id: id }]
    });

    const url = process.env.APP_URL;
    const port = process.env.APP_PORT;
    const pictureUrl = user.picture
      ? `${url}:${port}/uploads/user/${user.picture}`
      : `${url}:${port}/uploads/user/picture-default.png`;
      
    const bannerUrl = user.banner
      ? `${url}:${port}/uploads/user/${user.banner}`
      : `${url}:${port}/uploads/user/banner-default.png`;

    return { ...user, picture_url: pictureUrl, banner_url: bannerUrl }
  }


  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.createQueryBuilder('user')
      .addSelect('user.hashed_password')
      .addSelect('user.reset_password_token')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      return undefined
    }
    return user
  }

  async verifyIfEmailExists(email: string): Promise<boolean> {
    const existingUser = await this.usersRepository.findOne({ select: ['email'], where: { email } });
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