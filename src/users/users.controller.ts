import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @Get('/')
  @UseGuards(AuthGuard)
  getAll() {
    return this.users.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: UserDto })
  @Get('/:id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.users.findOneById(+id);
  }
}
