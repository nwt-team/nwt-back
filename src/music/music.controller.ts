import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MusicService } from './music.service';
import { MusicEntity } from './entities/music.entity';
import { ParamsHandler } from './validators/params-handler';
import { ApiParam } from '@nestjs/swagger';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Controller('music')
export class MusicController {

  /**
   * Constructor
   * @param _musicService
   */
  constructor(private readonly _musicService: MusicService) {
  }

  /**
   * handler to answer GET /music/{id} route
   * @param handler
   */
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() handler: ParamsHandler): Observable<MusicEntity> {
    return this._musicService.findOne(handler.id);
  }

  /**
   * handler to answer GET /music route
   */
  @Get()
  findAll(): Observable<MusicEntity[] | void> {
    return this._musicService.findAll();
  }

  @Get('/byTitle/:title')
  findByTitle(@Param() params: ParamsHandler): Observable<MusicEntity[] | void> {
    return this._musicService.findByTitle(params.title);
  }

  @Post()
  create(@Body() music: CreateMusicDto): Observable<MusicEntity> {
    return this._musicService.create(music);
  }

  @Put(':id')
  update(@Param() params: ParamsHandler, @Body() music: UpdateMusicDto): Observable<MusicEntity> {
    return this._musicService.update(params.id, music);
  }

  @Delete(':id')
  delete(@Param() params: ParamsHandler): Observable<void> {
    return this._musicService.remove(params.id);
  }


}
