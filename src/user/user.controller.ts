import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ParamsHandler } from '../validators/params-handler';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {

  /**
   * Constructor
   * @param _userService
   */
  constructor(private readonly _userService: UserService) {
  }

  /**
   * handler to answer GET /user/id/{id} route
   * @param req
   */
  @Get(':id')
  findOneById(@Param() handler: ParamsHandler): Observable<UserEntity> {
    return this._userService.findOne(handler.id);
  }
  /**
   * handler to answer GET /user/login/{login} route
   * @param handler
   */
  @Get('/byLogin/:login')
  findOneByLogin(@Param() handler: ParamsHandler): Observable<UserEntity> {
    return this._userService.findOneByLogin(handler.login);
  }

  /**
   * handler to answer GET /user route
   */
  @Get()
  findAll(): Observable<UserEntity[] | void> {
    return this._userService.findAll();
  }

  /**
   * handler to answer POST /user route
   */
  @Post()
  create(@Body() user: CreateUserDto): Observable<UserEntity>
  {
    return this._userService.create(user);
  }

  /**
   * handler to answer PUT /user route
   * @param handler
   * @param user
   */
  @Put(':id')
  updateUsingId(@Param() handler: ParamsHandler, @Body() user: CreateUserDto): Observable<UserEntity | void>
  {
    return this._userService.updateUsingId(handler.id, user);
  }

  /**
   * handler to answer PUT /user/byLogin route
   * @param handler
   * @param user
   */
  @Put('/byLogin/:login')
  updateUsingLogin(@Param() handler: ParamsHandler, @Body() user: CreateUserDto): Observable<UserEntity | void>
  {
    return this._userService.updateUsingLogin(handler.login, user);
  }

  /**
   * handler to answer DELETE /user route
   * @param handler
   */
  @Delete(':id')
  deleteUsingId(@Param() handler: ParamsHandler): Observable<void>
  {
    return this._userService.removeUsingId(handler.id);
  }

  /**
   * handler to answer DELETE /user/byLogin/{login} route
   * @param handler
   */
  @Delete('/byLogin/:login')
  deleteUsingLogin(@Param() handler: ParamsHandler): Observable<void>
  {
    return this._userService.removeUsingLogin(handler.login);
  }

}
