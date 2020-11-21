import { IsArray, IsHexadecimal, IsNotEmpty, IsString } from 'class-validator';


export class PlaylistDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({each:true})
  @IsHexadecimal({each:true})
  @IsNotEmpty()
  musics: string[];
}
