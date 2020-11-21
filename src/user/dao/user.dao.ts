import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model, MongooseDocument } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { from, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserDao {

  constructor(@InjectModel(User.name) private readonly _userModel: Model<User>){}

  find(): Observable<User[] | void> {
    return from(this._userModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  findById(id: String): Observable<User | void> {
    return from(this._userModel.findById(id))
      .pipe(
        map( (_: MongooseDocument) => !!_ ? _.toJSON() : undefined),
      );
  }
}
