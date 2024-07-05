import { Module, forwardRef } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/db/prisma.module';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  exports: [SettingsService],
})
export class SettingsModule {}
