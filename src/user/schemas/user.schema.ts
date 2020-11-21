import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class User extends Document{

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  firstname: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  lastname: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  avatar: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  login: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  password: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  birthDate: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  playlists: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);
