import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MusicService } from './music.service';
import { MusicEntity } from './entities/music.entity';
import { ParamsHandler } from '../validators/params-handler';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags, ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@ApiTags('music')
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
    description: 'Unique identifier of the music in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  @ApiOkResponse({ description: 'Returns one music', type: MusicEntity })
  @ApiNoContentResponse({ description: 'No music with this id exists in database' })
  findOne(@Param() handler: ParamsHandler): Observable<MusicEntity> {
    return this._musicService.findOne(handler.id);
  }

  /**
   * handler to answer GET /music route
   */
  @ApiOkResponse({ description: 'Returns a list of musics', type: MusicEntity })
  @ApiNoContentResponse({ description: 'No music exists in database' })
  @Get()
  findAll(): Observable<MusicEntity[] | void> {
    return this._musicService.findAll();
  }

  @ApiParam({
    name: 'title',
    description: 'Title of the music in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiOkResponse({ description: 'Returns musics', type: MusicEntity })
  @ApiNoContentResponse({ description: 'No music with this title exists in database' })
  @Get('/byTitle/:title')
  findByTitle(@Param() params: ParamsHandler): Observable<MusicEntity[] | void> {
    return this._musicService.findByTitle(params.title);
  }

  @ApiCreatedResponse({ description: 'The music has been successfully created', type: MusicEntity })
  @ApiConflictResponse({ description: 'The music already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @Post()
  create(@Body() music: CreateMusicDto): Observable<MusicEntity> {
    return this._musicService.create(music);
  }

  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the music in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiOkResponse({ description: 'Returns the updated music', type: MusicEntity })
  @ApiNoContentResponse({ description: 'No music with this id exists in database' })
  @Put(':id')
  update(@Param() params: ParamsHandler, @Body() music: UpdateMusicDto): Observable<MusicEntity> {
    return this._musicService.update(params.id, music);
  }

  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the music in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiOkResponse({ description: 'Returns the deleted music', type: MusicEntity })
  @ApiNoContentResponse({ description: 'No music with this id exists in database' })
  @Delete(':id')
  delete(@Param() params: ParamsHandler): Observable<void> {
    return this._musicService.remove(params.id);
  }
}
