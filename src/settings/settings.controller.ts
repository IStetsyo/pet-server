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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SettingDto } from './dto/setting.dto';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private settings: SettingsService) {}

  @ApiOperation({ summary: 'Get user settings' })
  @ApiResponse({ status: 200, type: [SettingDto] })
  @Get()
  @UseGuards(AuthGuard)
  findAllUserSettings(@Query('userId') userId: string) {
    return this.settings.findAllUserSettings(+userId);
  }

  @ApiOperation({ summary: 'Update setting' })
  @ApiResponse({ status: 200, type: SettingDto })
  @Patch('/:id')
  @UseGuards(AuthGuard)
  findUniqueSetting(@Param('id') id: string, @Body() input: CreateSettingDto) {
    return this.settings.updateUserSetting(+id, input);
  }

  @ApiOperation({ summary: 'Create setting' })
  @ApiResponse({ status: 200, type: SettingDto })
  @Post('/create')
  @UseGuards(AuthGuard)
  createUserSetting(
    @Query('userId') userId: string,
    @Body() input: CreateSettingDto,
  ) {
    return this.settings.createUserSetting(+userId, input);
  }

  @ApiOperation({ summary: 'Delete setting' })
  @ApiResponse({ status: 200, type: SettingDto })
  @Delete('/:id')
  @UseGuards(AuthGuard)
  removeUserSetting(@Param('id') id: string) {
    return this.settings.removeUserSetting(+id);
  }
}
