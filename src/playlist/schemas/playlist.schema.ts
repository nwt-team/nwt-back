import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  },
  versionKey: false
})
export class Playlist extends Document{
  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  title: string;

  @Prop({
    type: Array,
    required: false,
    trim: true,
  })
  musics: string[];
}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
