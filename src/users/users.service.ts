import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly prisma: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prisma = prismaService;
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        products: true,
        settings: true,
      },
    });
  }
  async findOneById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        products: true,
        settings: true,
      },
    });
  }
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        products: true,
        settings: true,
      },
    });
  }
  async createUser(input: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: { ...input },
      include: {
        settings: true,
        products: true,
      },
    });
    if (!newUser) {
      throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
    }
    return newUser;
  }
  async updateToken(userId: number, token: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: token },
      include: {
        products: true,
        settings: true,
      },
    });
  }
}
