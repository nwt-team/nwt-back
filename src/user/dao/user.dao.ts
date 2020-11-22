import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model, MongooseDocument } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { from, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserDao {

  constructor(@InjectModel(User.name) private readonly _userModel: Model<User>){}

  /**
   * Create a playlist in DB
   * @param playlist
   * @return { Observable<Playlist> }
   */
  save(user: CreateUserDto): Observable<User>
  {
    return from(new this._userModel(user).save())
      .pipe(
        map((_:MongooseDocument) => _.toJSON())
      )
  }

  find(): Observable<User[] | void> {
    return from(this._userModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  findById(id: String): Observable<User | void> {
    return from(this._userModel.findById(id))
      .pipe(
        map( (_: MongooseDocument) => !!_ ? _.toJSON() : undefined),
      );
  }


  findByLogin(login: string): Observable<User | void> {
    return from(this._userModel.findOne({login: login}))
      .pipe(
        map((_:MongooseDocument) => !!_ ? _.toJSON() : undefined)
      )
  }

  /**
   * Find user by id and update
   * @param id
   * @param user
   * @return { Observable<User | void> }
   */
  findByIdAndUpdate(id: string, user: UpdateUserDto): Observable<User | void>{
    return from(this._userModel.findByIdAndUpdate(id, user, { new: true, runValidators: true}))
      .pipe(
        map((_:MongooseDocument) => !!_ ? _.toJSON() : undefined)
      )
  }

  /**
   * Find user by login and update
   * @param id
   * @param user
   * @return { Observable<User | void> }
   */
  findByLoginAndUpdate(login: string, user: UpdateUserDto):Observable<User | void>{
    return from(this._userModel.findOneAndUpdate({login:login}, user, { new: true, runValidators: true}))
      .pipe(
        map((_:MongooseDocument) => !!_ ? _.toJSON() : undefined)
      )
  }

  /**
   * Find user by id and remove it from DB
   * @param id
   * @return { Observable<User[] | void> }
   */
  findByIdAndRemove(id: string): Observable<User | void> {
    return from(this._userModel.findByIdAndRemove(id))
      .pipe(
        map((_:MongooseDocument) => !!_ ? _.toJSON() : undefined)
      )
  }
  /**
   * Find user by login and remove it from DB
   * @param login
   * @return { Observable<User[] | void> }
   */
  findByLoginAndRemove(login: string): Observable<User | void>
  {
    return from(this._userModel.findOneAndRemove({ login:login }))
      .pipe(
        map((_:MongooseDocument) => !!_ ? _.toJSON() : undefined)
      )
  }
}
