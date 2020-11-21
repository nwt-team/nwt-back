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
    type: Array,
    required: true,
    trim: true,
  })
  artists: string[];

  @Prop({
    type: Array,
    required: true,
    trim: true,
  })
  genres: string[];

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
