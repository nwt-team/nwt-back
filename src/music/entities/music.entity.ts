import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class MusicEntity {

  @ApiProperty({
    name: 'title',
    description: 'Title of the music',
    example: 'Whole lotta love',
  })
  @Expose()
  @Type(() => String)
  title: string;


  @ApiProperty({
    name: 'artist',
    description: 'Artist who made the music',
    example: 'Led Zeppelin',
  })
  @Expose()
  @Type(() => String)
  artist: string;

  @ApiProperty({
    name: 'genre',
    description: 'The genre of the music',
    example: 'Metal classique',
  })
  @Expose()
  @Type(() => String)
  genre: string;

  @ApiProperty({
    name: 'year',
    description: 'Year of creation',
    example: 1969,
  })
  @Expose()
  @Type(() => Number)
  year: Number;

  @ApiProperty({
    name: 'type',
    description: 'The type of Music',
    example: 'Single',
  })
  @Expose()
  @Type(() => String)
  type: string;

  @ApiPropertyOptional({
    name: 'cover',
    description: 'Cover of an album or a single',
    example:
      'https://images-na.ssl-images-amazon.com/images/I/619CcXRfEIL._SL1200_.jpg',
  })
  @Expose()
  @Type(() => String)
  cover: string;

  @ApiPropertyOptional({
    name: 'album',
    description: 'The name of the album for this single',
    example:
      'Led Zeppelin II',
  })
  @Expose()
  @Type(() => String)
  album: string;

  /**
   * Constructor
   * @param partial data to insert in an object instance
   */
  constructor(partial: Partial<MusicEntity>) {
    Object.assign(this, partial);
  }
}
