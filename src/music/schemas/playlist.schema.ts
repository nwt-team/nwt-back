import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Music } from './music.schema';
import mongoose from "mongoose";

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class Playlist {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
  })
  _id: String;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  musics: string[];
}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
