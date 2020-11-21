import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { PlaylistDao } from './dao/playlist.dao';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PlaylistEntity } from './entities/playlist.entity';
import { PlaylistDto } from './dto/playlist.dto';

@Injectable()
export class PlaylistService {

  /**
   * Constructor
   * @param _playlistDao
   */
  constructor(private readonly _playlistDao: PlaylistDao) {
  }

  findOne(id: string): Observable<PlaylistEntity> {
    return this._playlistDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap( _ => !!_ ? of(new PlaylistEntity(_)) : throwError(new NotFoundException(`Playlist with id '${id}' not found`))),
      )
  }

  findAll(): Observable<PlaylistEntity[] | void> {
    return this._playlistDao.find()
      .pipe(
        map(docs => !!docs ? docs.map( _ => new PlaylistEntity(_)) : undefined),
      )
  }

  create(playlist: PlaylistDto): Observable<PlaylistEntity> {
    return this._playlistDao.save(playlist)
      .pipe(
        catchError(e =>
          throwError(new UnprocessableEntityException(e.message)),
        ),
        map( _ => new PlaylistEntity(_)),
      );
  }

  /**
   * Update music if the change doesn't already exist.
   * @param id
   * @param music
   */
  update(id: string, playlist: PlaylistDto): Observable<PlaylistEntity> {
    return this._playlistDao.findByIdAndUpdate(id, playlist)
      .pipe(
        catchError(e =>
          throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new PlaylistEntity(_)) :
            throwError(new NotFoundException(`Playlist not found exception`)),
        ),
      );
  }

  remove(id: string): Observable<void> {
    return this._playlistDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Playlist with id '${id}' not found`)),
        ),
      );
  }

}
