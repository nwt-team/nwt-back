import { IsArray, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  artists: string[];

  @IsString()
  @IsNotEmpty()
  genres: string[];

  @IsNumberString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  cover?: string;
}
