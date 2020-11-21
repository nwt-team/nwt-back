import { IsArray, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateMusicDto {

  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  artist?: string;

  @IsString()
  @IsNotEmpty()
  genre?: string;

  @IsNumber()
  @IsNotEmpty()
  year?: number;

  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsString()
  @IsOptional()
  cover?: string;
}
