import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Config from 'config';
import { ServerConfig } from './interfaces/server-config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './interfaces/swagger-config.interface';
import { Logger } from '@nestjs/common';

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
  const appDocument = SwaggerModule.createDocument(app, options, {
    include: [AppModule],
  });

  SwaggerModule.setup(swagger.path, app, appDocument);

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
