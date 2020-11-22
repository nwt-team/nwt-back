import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserEntity } from './entities/user.entity';
import { UserDao } from './dao/user.dao';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  findOneByLogin(login: string): Observable<UserEntity> {
    return this._userDao.findByLogin(login)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap( _ => !!_ ? of(new UserEntity(_)) : throwError(new NotFoundException(`User with login '${login}' not found`))),
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
  create(user: CreateUserDto): Observable<UserEntity>
  {
    return this._createUser(user)
      .pipe(
        mergeMap(_ => this._userDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`User with login '${user.login}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new UserEntity(_)),
      )
  }

  updateUsingId(id: string, user: UpdateUserDto): Observable<UserEntity>{
    return this._userDao.findByIdAndUpdate(id, user)
      .pipe(
        catchError(e =>
            throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`User not found exception`)),
        ),
      )
  }


  updateUsingLogin(login: string, user: UpdateUserDto){
    return this._userDao.findByLoginAndUpdate(login, user)
      .pipe(
        catchError(e =>
          throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`User not found exception`)),
        ),
      )
  }

  removeUsingId(id: string): Observable<void>{
    return this._userDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`User with id '${id}' not found`)),
        ),
      );
  }

  removeUsingLogin(login: string): Observable<void>{
    return this._userDao.findByLoginAndRemove(login)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`User with id '${login}' not found`)),
        ),
      );
  }


  private _createUser(user: CreateUserDto): Observable<CreateUserDto> {
    return of(user)
      .pipe(
        map(_ => (!!_.avatar && length > 0) ? _ :
          Object.assign(_, {
            avatar: 'https://randomuser.me/api/portraits/lego/7.jpg',
          })
        )
      );
  }


  private _parseDate(date: string): number {
    const dates = date.split('/');
    return (new Date(dates[ 2 ] + '/' + dates[ 1 ] + '/' + dates[ 0 ]).getTime());
  }
}
