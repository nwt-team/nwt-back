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
  versionKey: false,
} )
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
  artist: string;

  @Prop({
    type: Array,
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
    trim: true,
  })
  album: string;

  @Prop({
    type: String,
    lowercase:true,
  })
  cover: string;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
