import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './dao/user.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [ MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]) ],
  controllers: [UserController],
  providers: [UserService, UserDao],
  exports:[UserService]
})
export class UserModule {}
