import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import * as path from 'path';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SettingsModule } from './settings/settings.module';
import { FileModule } from './file/file.module';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';
import { SettingsService } from './settings/settings.service';
import { SettingsController } from './settings/settings.controller';
import { PrismaService } from './db/prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    SettingsModule,
    FileModule,
    SettingsModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, './static'),
    }),
  ],
  controllers: [
    AuthController,
    UsersController,
    ProductsController,
    SettingsController,
  ],
  providers: [
    AuthService,
    UsersService,
    ProductsService,
    SettingsService,
    PrismaService,
  ],
})
export class AppModule {}
