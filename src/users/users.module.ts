import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/db/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
