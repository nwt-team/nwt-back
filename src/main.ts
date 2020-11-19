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

  //Create documentation
  const options = new DocumentBuilder()
    .setTitle(swagger.title)
    .setBasePath(swagger.path)
    .setDescription(swagger.description)
    .setVersion(swagger.version)
    .addTag(swagger.tag)
    .build();

  // create swagger document
  const MusicDocument = SwaggerModule.createDocument(app, options, {
    include: [MusicModule],
  });

  SwaggerModule.setup(swagger.path, app, MusicDocument);

  await app.listen(config.port, config.host);
  Logger.log(
    `Application served at http://${config.host}:${config.port}`,
    'bootstrap',
  );
}
bootstrap(
  Config.get<ServerConfig>('server'),
  Config.get<SwaggerConfig>('swagger'),
);
