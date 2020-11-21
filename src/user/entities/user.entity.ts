import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UserEntity {
  @Expose()
  @Type(() => String)
  avatar: string;

  @Expose()
  @Type(() => String)
  firstname: string;

  @Expose()
  @Type(() => String)
  lastname: string;

  @Expose()
  @Type(() => String)
  login: string;

  @Expose()
  @Type(() => String)
  password: string;

  @Expose()
  @Type(() => String)
  birthDate: string;

  @Expose()
  @Type(() => String)
  email: string;

  @Expose()
  @Type(() => String)
  playlists: string[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
