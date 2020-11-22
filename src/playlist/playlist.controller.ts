import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ParamsHandler } from '../validators/params-handler';
import { PlaylistEntity } from './entities/playlist.entity';
import { PlaylistDto } from './dto/playlist.dto';
import { PlaylistService } from './playlist.service';

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
    description: 'Unique identifier of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() handler: ParamsHandler): Observable<PlaylistEntity> {
    return this._playlistService.findOne(handler.id);
  }

  /**
   * handler to answer GET /playlist route
   */
  @Get()
  findAll(): Observable<PlaylistEntity[] | void> {
    return this._playlistService.findAll();
  }

  @Post()
  create(@Body() playlist: PlaylistDto): Observable<PlaylistEntity> {
    return this._playlistService.create(playlist);
  }

  @Put(':id')
  update(@Param() params: ParamsHandler, @Body() playlist: PlaylistDto): Observable<PlaylistEntity> {
    return this._playlistService.update(params.id, playlist);
  }

  @Delete(':id')
  delete(@Param() params: ParamsHandler): Observable<void> {
    return this._playlistService.remove(params.id);
  }
}
