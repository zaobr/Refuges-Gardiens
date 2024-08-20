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

@Controller('user')
export class UserController {
    constructor(private service: UserService) {}

    @Get(':id')
    get(@Param('id') params): Promise<User[]> {
      return this.service.getUser(params.id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUsers(): Promise<User[]> {
      return this.service.getUsers();
    }

    @Post()
    create(@Body() user: User) {
      return this.service.saveUser(user);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() user: User) {
      return this.service.updateUser(id, user);
    }
  
    @Delete(':id')
    deleteUser(@Param() params) {
      this.service.deleteUser(params.id);
      return `Deletion complete`
    }

}

//Pour protéger une route: @UseGuards(AuthGuard('jwt'))