import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getAll() {
    return this.users.findAll();
  }
  @Get('/:id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.users.findOneById(+id);
  }
}
