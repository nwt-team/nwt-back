import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { MusicDao } from './dao/music.dao';
import { from, Observable, of, throwError } from 'rxjs';
import { MusicEntity } from './entities/music.entity';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

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

  findAll(): Observable<MusicEntity[] | void> {
    return this._musicDao.find()
      .pipe(
        map(docs => !!docs ? docs.map( _ => new MusicEntity(_)) : undefined),
      )
  }

  findByTitle(title: string): Observable<MusicEntity[] | void> {
    return this._musicDao.findByTitle(title)
      .pipe(
        map(docs => !!docs ? docs.map( _ => new MusicEntity(_)) : undefined),
      )
  }

  findByAlbum(album: string): Observable<MusicEntity[] | void> {
    album = album.toLowerCase()
    return this._musicDao.findByAlbum(album)
      .pipe(
        map(docs => !!docs ? docs.map( _ => new MusicEntity(_)) : undefined),
      )
  }

  create(music: CreateMusicDto): Observable<MusicEntity> {
    return this._addMusic(music)
      .pipe(
        mergeMap( _ => this._musicDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Music already exist`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new MusicEntity(_))
      );
  }

  /**
   * Update music if the change doesn't already exist.
   * @param id
   * @param music
   */
  update(id: string, music: UpdateMusicDto): Observable<MusicEntity> {
    return this._musicDao.findByIdAndUpdate(id, music)
      .pipe(
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Music already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new MusicEntity(_)) :
            throwError(new NotFoundException(`Music not found exception`)),
        ),
      );
  }

  remove(id: string): Observable<void> {
    return this._musicDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Music with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Verify if the music have a cover
   * @param music
   * @private
   */
  private _addMusic(music: CreateMusicDto): Observable<CreateMusicDto>
  {
    return of(music)
      .pipe(
        map(_ => {
          if (!_.cover) {
            Object.assign(_, {
              cover: 'ressources/default_album_art.png'
            })
          }
          return _
        }),
      );
  }
}
