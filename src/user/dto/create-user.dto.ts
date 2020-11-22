import {
  IsArray,
  IsDate, IsEmail, IsHash,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl, Matches,
} from 'class-validator';

export class CreateUserDto {



  @IsUrl()
  @IsOptional()
  avatar?: string

  @IsString()
  @IsOptional()
  firstname?: string

  @IsString()
  @IsOptional()
  lastname?: string

  @IsString()
  login: string

  @Matches(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  password: string

  @IsDate()
  @IsOptional()
  birthDate?: string

  @IsEmail()
  email: string

  @IsArray()
  @IsString({each:true})
  @IsMongoId({each:true})
  @IsOptional()
  playlists?: string[]
}
