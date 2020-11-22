import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './dao/user.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './authStrategies/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [ MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]) , PassportModule],
  controllers: [UserController, AuthController],
  providers: [UserService, UserDao, AuthService, LocalStrategy],
})
export class UserModule {}
