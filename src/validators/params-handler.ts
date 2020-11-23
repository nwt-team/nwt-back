import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class ParamsHandler {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  album: string;
}
