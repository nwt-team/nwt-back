import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class Music extends Document {
  @Prop({
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  artist: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  genre: string;

  @Prop({
    type: Number,
    required: true,
  })
  year: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  type: string;

  @Prop({
    type: String,
  })
  cover: string;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
