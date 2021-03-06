import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistDao } from './dao/playlist.dao';
import { PlaylistController } from './playlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }]) ],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistDao]
})
export class PlaylistModule {}
