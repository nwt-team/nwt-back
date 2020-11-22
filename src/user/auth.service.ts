import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}

  validateUser(login: string, pass: string): Observable<any> {
    const bcrypt = require('bcrypt');
    return  this.userService.findOneByLogin(login)
      .pipe(
        map(_ => (!!_ && bcrypt.compare(pass, _.password).then(function(result) {})) ?
          Object.assign({password: ""}) :
          undefined
        )
      )
  }
}
