import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { randomBytes } from 'node:crypto';

@Injectable()
export class AuthService {
  private readonly users: UsersService;
  private readonly jwt: JwtService;

  constructor(userService: UsersService, jwtService: JwtService) {
    this.users = userService;
    this.jwt = jwtService;
  }

  async signIn(input: SignInDto) {
    const user = await this.validateUser(input);
    return this.generateToken(user);
  }
  async signUp(input: SignUpDto) {
    const existingUser = await this.users.findOneByEmail(input.email);

    if (existingUser) {
      throw new HttpException(
        'User with such email already exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(input.password, 5);
    const refreshToken = randomBytes(20).toString('hex');

    const newUser = await this.users.createUser({
      ...input,
      password: hashedPassword,
      refreshToken,
    });

    return this.generateToken(newUser);
  }

  private async validateUser(input: SignInDto) {
    const user = await this.users.findOneByEmail(input.email);
    const isPasswordValid = bcrypt.compare(
      input.password,
      user?.password ?? '',
    );
    if (!isPasswordValid || !user) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }
    const updatedUser = await this.users.updateToken(
      user.id,
      randomBytes(20).toString('hex'),
    );
    if (!updatedUser) {
      throw new UnauthorizedException({ message: 'Token error' });
    }
    return updatedUser;
  }

  private async generateToken(user: User | null) {
    return {
      accessToken: this.jwt.sign({
        email: user.email,
        id: user.id,
        name: user.name,
      }),
      refreshToken: user.refreshToken,
      id: user.id,
    };
  }
  async restoreToken(userId: number, refreshToken: string) {
    const user = await this.users.findOneById(userId);
    if (user.refreshToken === refreshToken) {
      return this.generateToken(user);
    }
    throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
  }
}
