import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  createUser(@Body() body: User) {
    return this.usersService.create(body);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: User) {
    return this.usersService.update(+id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
