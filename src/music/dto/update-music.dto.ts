import { IsArray, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMusicDto {

  @ApiProperty({
    name: 'title',
    description: 'Title of the music',
    example: 'Whole lotta love',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    name: 'artists',
    description: 'Artist who made the music',
    example: 'Led Zeppelin',
  })
  @IsString()
  @IsOptional()
  artist?: string;

  @ApiProperty({
    name: 'genres',
    description: 'The genre of the music',
    example: 'Metal classique',
  })
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiProperty({
    name: 'year',
    description: 'Year of creation',
    example: 1970,
  })
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiProperty({
    name: 'type',
    description: 'The type of Music',
    example: 'Single',
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    name: 'cover',
    description: 'Cover of an album or a single',
    example:
      'https://images-na.ssl-images-amazon.com/images/I/619CcXRfEIL._SL1200_.jpg',
  })
  @IsString()
  @IsOptional()
  cover?: string;

  @ApiPropertyOptional({
    name: 'album',
    description: 'The name of the album for this single',
    example:
      'Led Zeppelin II',
  })
  @IsString()
  @IsOptional()
  album?: string;
}
