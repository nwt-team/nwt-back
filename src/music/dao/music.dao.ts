import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Music } from '../schemas/music.schema';
import { Model, Mongoose, MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
   * Returns one music of the list matching the id in paramter
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
}
