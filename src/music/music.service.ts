import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { MusicDao } from './dao/music.dao';
import { Observable, of, throwError } from 'rxjs';
import { MusicEntity } from './entities/music.entity';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class MusicService {
  /**
   * Constructor
   *
   * @param _musicDao
   */
  constructor(private readonly _musicDao: MusicDao) {}

  findOne(id: string): Observable<MusicEntity> {
    return this._musicDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap( _ => !!_ ? of(new MusicEntity(_)) : throwError(new NotFoundException(`Music with id '${id}' not found`))),
      )
  }
}
