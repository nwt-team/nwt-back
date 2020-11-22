import { IsArray, IsHexadecimal, IsMongoId, IsNotEmpty, IsString } from 'class-validator';


export class PlaylistDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({each:true})
  @IsMongoId({each:true})
  @IsNotEmpty()
  musics: string[];
}
