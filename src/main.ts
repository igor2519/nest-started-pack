import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { logger } from '@utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new logger(['error', 'debug']),
  });

  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Xilo API')
        .setDescription('Xilo API docs')
        .build(),
    );

    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(process.env.PORT);
  console.log('Server started > ' + process.env.PORT);
}
bootstrap();
