import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Music } from '../schemas/music.schema';
import { Model, Mongoose, MongooseDocument } from 'mongoose';
import { from, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateMusicDto } from '../dto/create-music.dto';
import { UpdateMusicDto } from '../dto/update-music.dto';

@Injectable()
export class MusicDao {
  /**
   * Constructeur
   *
   * @param {Model<Music>>}_musicModel
   */
  constructor(
    @InjectModel(Music.name) private readonly _musicModel: Model<Music>,
  ) {}

  /**
   * Returns one music of the list matching the id in parameter
   *
   * @param id
   *
   * @return {Observable<Music | void>}
   */
  findById(id: string): Observable<Music | void> {
    return from(this._musicModel.findById(id)).pipe(
      map((doc: MongooseDocument) => (!!doc ? doc.toJSON() : undefined)),
    );
  }

  /**
   *  Returns a list of Music
   *
   * @return {Observable<Music[] | void>}
   */
  find(): Observable<Music[] | void> {
    return from(this._musicModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined ),
      );
  }

  /**
   * Find music by title
   * @param title
   * @return Observable<Music[] | void>
   */
  findByTitle(title: string): Observable<Music[] | void> {
    return from(this._musicModel.find({title: title}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined ),
      );
  }


  findByAlbum(album: string): Observable<Music[] | void> {
    return from(this._musicModel.find({album: album}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined ),
      )
  }

  /**
   * Create music and return it
   * @param music
   * @return {Observable<Music[]>}
   */
  save(music: CreateMusicDto): Observable<Music> {
    return from(new this._musicModel(music).save())
      .pipe(
        map( (doc: MongooseDocument) => doc.toJSON()),
      );
  }

  /**
   * Update music and return it
   * @param id
   * @param music
   * @return {Observable<Music[] | void>}
   */
  findByIdAndUpdate(id: string, music: UpdateMusicDto): Observable<Music | void> {
    return from(this._musicModel.findByIdAndUpdate(id, music, { new: true, runValidators: true}))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Remove object if Id is found in DB and return it
   * @param id
   * @return {Observable<Music[] | void>}
   */
  findByIdAndRemove(id: string): Observable<Music | void> {
    return from(this._musicModel.findByIdAndRemove(id))
      .pipe(
        map((doc:MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
