import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateSettingDto } from './dto/create-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private settings: SettingsService) {}
  @Get()
  @UseGuards(AuthGuard)
  findAllUserSettings(@Query('userId') userId: string) {
    return this.settings.findAllUserSettings(+userId);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  findUniqueSetting(@Param('id') id: string, @Body() input: CreateSettingDto) {
    return this.settings.updateUserSetting(+id, input);
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  createUserSetting(
    @Query('userId') userId: string,
    @Body() input: CreateSettingDto,
  ) {
    return this.settings.createUserSetting(+userId, input);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  removeUserSetting(@Param('id') id: string) {
    return this.settings.removeUserSetting(+id);
  }
}
