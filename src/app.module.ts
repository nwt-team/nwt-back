import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MusicModule } from './music/music.module';
import * as Config from 'config';
import { UserModule } from './user/user.module';
import { User, UserSchema } from './user/schemas/user.schema';
import { Music, MusicSchema } from './music/schemas/music.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      Config.get<string>('mongodb.uri'),
      Config.get<MongooseModuleOptions>('mongodb.options'),
    ),
    MusicModule,
    UserModule,
  ],
})
export class AppModule {}
