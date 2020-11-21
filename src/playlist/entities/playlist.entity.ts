import { Exclude, Expose, Type } from 'class-transformer';
@Exclude()
export class PlaylistEntity {
  @Expose()
  @Type( () => String)
  title: string;

  @Expose()
  @Type(() => String)
  musics: string[];

  constructor(partial: Partial<PlaylistEntity>) {
    Object.assign(this, partial)
  }
}
