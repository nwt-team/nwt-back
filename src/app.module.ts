import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MusicModule } from './music/music.module';
import * as Config from 'config';
import { UserModule } from './user/user.module';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      Config.get<string>('mongodb.uri'),
      Config.get<MongooseModuleOptions>('mongodb.options'),
    ),
    MusicModule,
    UserModule,
    PlaylistModule,
    AuthModule
  ]
})
export class AppModule {}
