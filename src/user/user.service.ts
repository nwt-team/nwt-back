import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserEntity } from './entities/user.entity';
import { UserDao } from './dao/user.dao';

@Injectable()
export class UserService {

  constructor(private readonly _userDao: UserDao) {
  }

  findOne(id: string): Observable<UserEntity> {
    return this._userDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap( _ => !!_ ? of(new UserEntity(_)) : throwError(new NotFoundException(`User with id '${id}' not found`))),
      )
  }

  findAll(): Observable<UserEntity[] | void> {
    return this._userDao.find()
      .pipe(
        map( _ => {
          return !!_ ? _.map(__ => new UserEntity(__)) : undefined;
        }),
      );
  }

  //https://randomuser.me/api/portraits/lego/7.jpg
}
