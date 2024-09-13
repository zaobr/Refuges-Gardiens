import {
  Controller,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlinkSync, existsSync } from 'fs';
import { User } from "../user.entities/user.entity";
import { UserService } from "../user.services/user.service";
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../user.dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  @Get('check-email')
  async checkIfEmailExists(@Query('email') email: string): Promise<{ exists: boolean }> {
    const exists = await this.service.verifyIfEmailExists(email);
    return { exists };
  }

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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './uploads/user',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExt = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
      },
    }),
  }))
  async update(@Param('id') id: number, @Body() user: UpdateUserDto, @UploadedFiles() files: { picture?: Express.Multer.File[], banner?: Express.Multer.File[] }
  ) {
    // Fetch the existing user from the database
    const existingUser = await this.service.getUserById(id);

    // Delete the old picture if a new one is uploaded
    if (files?.picture && files.picture[0]) {
      if (existingUser.picture && existsSync(`./uploads/user/${existingUser.picture}`)) {
        unlinkSync(`./uploads/user/${existingUser.picture}`); // Deletes the old picture
      }
      user.picture = files.picture[0].filename; // Save new picture filename
    }

    // Delete the old banner if a new one is uploaded
    if (files?.banner && files.banner[0]) {
      if (existingUser.banner && existsSync(`./uploads/user/${existingUser.banner}`)) {
        unlinkSync(`./uploads/user/${existingUser.banner}`); // Deletes the old banner
      }
      user.banner = files.banner[0].filename; // Save new banner filename
    }

    // Update the user with the new image filenames (if they exist)
    await this.service.updateUser(id, user);
    return {
      message: 'User updated',
      files: {
        picture: user.picture,
        banner: user.banner,
      },
    };
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    this.service.deleteUser(id);
    return `Deletion complete`
  }
}

//Pour protéger une route: @UseGuards(AuthGuard('jwt'))