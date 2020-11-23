import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMusicDto {
  @ApiProperty({
    name: 'title',
    description: 'Title of the music',
    example: 'Whole lotta love',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'artists',
    description: 'Artist who made the music',
    example: 'Led Zeppelin',
  })
  @IsString()
  @IsNotEmpty()
  artist: string;

  @ApiProperty({
    name: 'genres',
    description: 'The genre of the music',
    example: 'Metal classique',
  })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({
    name: 'year',
    description: 'Year of creation',
    example: 1969,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    name: 'type',
    description: 'The type of Music',
    example: 'Single',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

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
