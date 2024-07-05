import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS + Prisma app')
    .setDescription('Backend app for adaptation course')
    .setVersion('1.0.0')
    .addTag('DEVELOPMENT')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log('Server just started! on localhost:' + PORT);
  });
}
bootstrap();
