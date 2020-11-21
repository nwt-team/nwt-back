import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Music, MusicSchema } from './schemas/music.schema';
import { MusicDao } from './dao/music.dao';
import { MusicController } from './music.controller';


@Module({
  imports: [ MongooseModule.forFeature([ { name: Music.name, schema: MusicSchema }]) ],
  providers: [MusicService, MusicDao],
  controllers: [MusicController],
})
export class MusicModule {}
