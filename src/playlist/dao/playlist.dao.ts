import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist } from '../schemas/playlist.schema';
import { Model, MongooseDocument } from 'mongoose';
import { PlaylistDto } from '../dto/playlist.dto';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PlaylistDao {

  /**
   * Constructor
   * @param _playlistModel
   */
  constructor(@InjectModel(Playlist.name) private readonly _playlistModel: Model<Playlist>) {
  }

  /**
   * Create a playlist in Db
   * @param playlist
   * @return { Observable<Playlist> }
   */
  save(playlist: PlaylistDto): Observable<Playlist>
  {
    return from(new this._playlistModel(playlist).save())
      .pipe(
        map((_:MongooseDocument) => _.toJSON()),
      );
  }

  /**
   *Get all playlists
   * @return { Observable<Playlist[] | void> }
   */
  find(): Observable<Playlist[] | void> {
    return from(this._playlistModel.find())
      .pipe(
        map((_:MongooseDocument[]) => (!!_ && _.length > 0) ? _.map(__ => __.toJSON()) : undefined),
      );
  }

  /**
   * Get playlist by id
   * @param id
   * @return { Observable<Playlist[] | void> }
   */
  findById(id: string): Observable<Playlist | void> {
    return from(this._playlistModel.findById(id))
      .pipe(
        map((_:MongooseDocument) => !!_ ? _.toJSON() : undefined),
      );
  }

  /**
   * Find playlist with id and update
   * @param id
   * @param playlist
   * @return { Observable<Playlist | void> }
   */
  findByIdAndUpdate(id: string, playlist: PlaylistDto): Observable<Playlist | void>{
    return from(this._playlistModel.findByIdAndUpdate(id, playlist, { new: true, runValidators: true}))
      .pipe(
        map((_:MongooseDocument) => !!_ ? _.toJSON() : undefined),
      );
  }

  /**
   * Find playlist by id and remove it from DB
   * @param id
   * @return { Observable<Playlist[] | void> }
   */
  findByIdAndRemove(id: string): Observable<Playlist | void> {
    return from(this._playlistModel.findByIdAndRemove(id))
      .pipe(
        map((_:MongooseDocument) => !!_ ? _.toJSON() : undefined),
      );
  }
}
