import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Config from 'config';
import { ServerConfig } from './interfaces/server-config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './interfaces/swagger-config.interface';
import { Logger } from '@nestjs/common';
import { MusicModule } from './music/music.module';

async function bootstrap(config: ServerConfig, swagger: SwaggerConfig) {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //Create documentation
  const musicOptions = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .setVersion(swagger.version)
    .addTag(swagger.musicTag)
    .build();

  // create swagger document
  const MusicDocument = SwaggerModule.createDocument(app, musicOptions, {
    include: [MusicModule],
  });

  SwaggerModule.setup(swagger.path, app, MusicDocument);

  await app.listen(config.port, config.host,);
  Logger.log(
    `Application served at http://${config.host}:${config.port}/`,
    'bootstrap',
  );
}
bootstrap(
  Config.get<ServerConfig>('server'),
  Config.get<SwaggerConfig>('swagger'),
);
