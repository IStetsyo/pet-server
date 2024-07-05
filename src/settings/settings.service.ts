import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateSettingDto } from './dto/create-setting.dto';

@Injectable()
export class SettingsService {
  private readonly prisma: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prisma = prismaService;
  }

  async findAllUserSettings(userId: number) {
    if (typeof userId !== 'number' || Number.isNaN(userId)) {
      throw new HttpException(
        'userId must be a number',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.userSetting.findMany({
      where: { userId },
    });
  }
  async updateUserSetting(id: number, input: CreateSettingDto) {
    if (typeof id !== 'number' || Number.isNaN(id)) {
      throw new HttpException(
        'setting id must be a number',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.userSetting.update({
      where: { key: input.key, id },
      data: {
        value: input.value,
      },
    });
  }
  async createUserSetting(userId: number, input: CreateSettingDto) {
    if (typeof userId !== 'number' || Number.isNaN(userId)) {
      throw new HttpException(
        'userId must be a number',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingSetting = await this.prisma.userSetting.findFirst({
      where: { userId, key: input.key },
    });
    if (existingSetting) {
      throw new HttpException(
        'setting with such key already exist!',
        HttpStatus.CONFLICT,
      );
    }

    return this.prisma.userSetting.create({
      data: {
        ...input,
        userId,
      },
    });
  }
  async removeUserSetting(settingId: number) {
    if (typeof settingId !== 'number' || Number.isNaN(settingId)) {
      throw new HttpException(
        'settingId must be a number',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.userSetting.delete({
      where: { id: settingId },
    });
  }
}
