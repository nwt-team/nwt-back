import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MusicService } from './music.service';
import { MusicEntity } from './entities/music.entity';
import { ParamsHandler } from './validators/params-handler';
import { ApiParam } from '@nestjs/swagger';

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

}
