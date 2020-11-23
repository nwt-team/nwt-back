import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
@Exclude()
export class PlaylistEntity {
  @ApiProperty({
    name: 'title',
    description: 'Title of the playlist',
    example: 'Whole lotta love',
  })
  @Expose()
  @Type( () => String)
  title: string;

  @ApiProperty({
    name: 'musics',
    description: 'A list of musics id',
    example: ['5fb959a337c28d6aac7e99fc', '5fb959a337c28d6aac7e99fd'],
  })
  @Expose()
  @Type(() => String)
  musics: string[];

  constructor(partial: Partial<PlaylistEntity>) {
    Object.assign(this, partial)
  }
}
