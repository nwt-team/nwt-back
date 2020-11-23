import { Injectable, Logger } from '@nestjs/common';
import {  Observable } from 'rxjs';
import { map, } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {}

  validateUser(login: string, pass: string): Observable<UserEntity> {
    const bcrypt = require('bcrypt');
    return this.userService.findOneByLogin(login)
      .pipe(
        map(_ => {
            if (!!_) {
              let result = bcrypt.compareSync(pass, _.password);
              if (result) {
                Object.assign(_, {
                  password: ""
                })
                return _
              } else {
                return undefined
              }
            }
          }
        )
      )
  }
}
