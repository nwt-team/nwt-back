import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UserParamsHandler {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;
}
