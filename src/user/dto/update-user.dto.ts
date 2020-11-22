import {
  IsArray,
  IsDate,
  IsDateString,
  IsEmail,
  IsHash,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl, Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsUrl()
  @IsOptional()
  avatar?: string

  @IsString()
  @IsOptional()
  firstname?: string

  @IsString()
  @IsOptional()
  lastname?: string


  @Matches(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  @IsOptional()
  password?: string

  @IsDateString()
  @IsOptional()
  birthDate?: string

  @IsEmail()
  email?: string

  @IsArray()
  @IsString({each:true})
  @IsMongoId({each:true})
  @IsOptional()
  playlists?: string[]
}
