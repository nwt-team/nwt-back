import { IsArray, IsHexadecimal, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class PlaylistDto {

  @ApiProperty({
    name: 'title',
    description: 'Title of the playlist',
    example: 'Whole lotta love',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'musics',
    description: 'A list of musics id',
    example: ['5fb959a337c28d6aac7e99fc', '5fb959a337c28d6aac7e99fd'],
  })
  @IsArray()
  @IsString({each:true})
  @IsMongoId({each:true})
  @IsNotEmpty()
  musics: string[];
}
