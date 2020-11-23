import { Injectable, Logger } from '@nestjs/common';
import {  Observable } from 'rxjs';
import { map, } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const bcrypt = require('bcrypt');
    return this.userService.findOneByLogin(login)
      .pipe(
        map(user => {
           return  bcrypt.compare(pass, user.password).then(function(result) {
              if (result == true){
                Object.assign(user,{
                  password:""
                })
                return user;
              } else {
                return undefined;
              }
            });
          }
        )
      )
  }
}
