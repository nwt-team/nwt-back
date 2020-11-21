import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserParamsHandler } from './validators/params-handler';

@Controller('user')
export class UserController {

  /**
   * Constructor
   * @param _userService
   */
  constructor(private readonly _userService: UserService) {
  }

  /**
   * handler to answer GET /music/{id} route
   * @param handler
   */
  @Get(':id')
  findOne(@Param() handler: UserParamsHandler): Observable<UserEntity> {
    return this._userService.findOne(handler.id);
  }

  /**
   * handler to answer GET /user route
   */
  @Get()
  findAll(): Observable<UserEntity[] | void> {
    return this._userService.findAll();
  }

}
