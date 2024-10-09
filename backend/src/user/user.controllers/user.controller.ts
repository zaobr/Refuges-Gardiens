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
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlinkSync, existsSync } from 'fs';
import { User } from "../user.entities/user.entity";
import { UserService } from "../user.services/user.service";
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../user.dto/update-user.dto';
import { UserDto } from '../user.dto/user.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  @Get('check-email')
  async checkIfEmailExists(@Query('email') email: string): Promise<{ exists: boolean }> {
    const exists = await this.service.verifyIfEmailExists(email);
    return { exists };
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<UserDto> {
    return this.service.getUserById(id);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.service.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('edition')
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
  async update(@Req() req: {user: User}, @Body() user: UpdateUserDto, @UploadedFiles() files: { picture?: Express.Multer.File, banner?: Express.Multer.File }
  ) {

    const id = req.user.id

    const picture = files.picture ? files.picture[0] : null;
    const banner = files.banner ? files.banner[0] : null;
    
    // Fetch the existing user from the database
    const existingUser = await this.service.getUserById(id);

    if (picture) {
      // If a new picture was uploaded, delete the old one and save the new one
      if (existingUser.picture && existingUser.picture !== 'picture-default.png' && existsSync(`./uploads/user/${existingUser.picture}`)) {
        unlinkSync(`./uploads/user/${existingUser.picture}`); // Deletes the old picture
      }
      user.picture = picture.filename; // Save new picture filename
    } else if (picture === 'null') {
      // If the picture was explicitly deleted, handle that case
      if (existingUser.picture && existingUser.picture !== 'picture-default.png' && existsSync(`./uploads/user/${existingUser.picture}`)) {
        unlinkSync(`./uploads/user/${existingUser.picture}`);
      }
      user.picture = null;
    }

    if (banner) {
      // If a new banner was uploaded, delete the old one and save the new one
      if (existingUser.banner && existingUser.banner !== 'banner-default.png' && existsSync(`./uploads/user/${existingUser.banner}`)) {
        unlinkSync(`./uploads/user/${existingUser.banner}`); // Deletes the old banner
      }
      user.banner = banner.filename; // Save new banner filename
    } else if (banner === 'null') {
      // If the banner was explicitly deleted, handle that case
      if (existingUser.banner && existingUser.banner !== 'banner-default.png' && existsSync(`./uploads/user/${existingUser.banner}`)) {
        unlinkSync(`./uploads/user/${existingUser.banner}`);
      }
      user.banner = null;
    }

    return await this.service.updateUser(id, user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    this.service.deleteUser(id);
    return `Deletion complete`
  }
}

//Pour protéger une route: @UseGuards(AuthGuard('jwt'))