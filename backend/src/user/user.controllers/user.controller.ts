import {
    Controller,
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
import { UpdateUserDto } from '../user.dto/update-user.dto';

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
  
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id: number, @Body() user: UpdateUserDto) {
      this.service.updateUser(id, user);
      return 'User updated'
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
      this.service.deleteUser(id);
      return `Deletion complete`
    }
}

//Pour protéger une route: @UseGuards(AuthGuard('jwt'))