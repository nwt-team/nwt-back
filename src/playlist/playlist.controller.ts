import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ParamsHandler } from '../validators/params-handler';
import { PlaylistEntity } from './entities/playlist.entity';
import { PlaylistDto } from './dto/playlist.dto';
import { PlaylistService } from './playlist.service';
import { MusicEntity } from '../music/entities/music.entity';

@ApiTags('playlist')
@Controller('playlist')
export class PlaylistController {

  constructor(private readonly _playlistService: PlaylistService) {
  }

  /**
   * handler to answer GET /playlist/{id} route
   * @param handler
   */
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the playlist in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiOkResponse({ description: 'Returns one playlist', type: PlaylistEntity })
  @ApiNoContentResponse({ description: 'No playlist with this id exists in database' })
  @Get(':id')
  findOne(@Param() handler: ParamsHandler): Observable<PlaylistEntity> {
    return this._playlistService.findOne(handler.id);
  }

  /**
   * handler to answer GET /playlist route
   */
  @ApiOkResponse({ description: 'Returns a list of playlist', type: PlaylistEntity })
  @ApiNoContentResponse({ description: 'No playlists  exists in database' })
  @Get()
  findAll(): Observable<PlaylistEntity[] | void> {
    return this._playlistService.findAll();
  }

  @ApiOkResponse({ description: 'Returns a list of playlist', type: PlaylistEntity })
  @ApiNoContentResponse({ description: 'No playlists  exists in database' })
  @Post()
  create(@Body() playlist: PlaylistDto): Observable<PlaylistEntity> {
    return this._playlistService.create(playlist);
  }

  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the playlist in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiOkResponse({ description: 'Returns a list of playlist', type: PlaylistEntity })
  @ApiNoContentResponse({ description: 'No playlists  exists in database' })
  @Put(':id')
  update(@Param() params: ParamsHandler, @Body() playlist: PlaylistDto): Observable<PlaylistEntity> {
    return this._playlistService.update(params.id, playlist);
  }

  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the playlist in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @Delete(':id')
  delete(@Param() params: ParamsHandler): Observable<void> {
    return this._playlistService.remove(params.id);
  }
}
