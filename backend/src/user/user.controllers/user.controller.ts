import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Param,
    UseGuards
  } from '@nestjs/common';
import { User } from "../user.entities/user.entity";
import { UserService } from "../user.services/user.service";
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user.dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private service: UserService) {}

    @Get(':id')
    get(@Param('id') id: number): Promise<User> {
      return this.service.getUserById(id);
    }

    @Get()
    async getUsers(): Promise<User[]> {
      return this.service.getUsers();
    }

    @Post() //a supprimer
    create(@Body() createUserDto: CreateUserDto) {
      return this.service.saveUser(createUserDto);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() user: User) {
      return this.service.updateUser(id, user);
    }
  
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
      this.service.deleteUser(id);
      return `Deletion complete`
    }
}

//Pour protéger une route: @UseGuards(AuthGuard('jwt'))