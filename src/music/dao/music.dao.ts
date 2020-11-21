import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Music } from '../schemas/music.schema';
import { Model, Mongoose, MongooseDocument } from 'mongoose';
import { from, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateMusicDto } from '../dto/create-music.dto';

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

  save(music: CreateMusicDto): Observable<Music> {
    return from(new this._musicModel(music).save())
      .pipe(
        map( (doc: MongooseDocument) => doc.toJSON()),
      );
  }
}
