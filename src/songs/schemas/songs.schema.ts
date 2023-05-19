import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Genre } from 'src/genres/schemas/genres.schema';

@Schema()
export class Song {
  @Prop({
    required: true,
  })
  title: string;
  // @Prop({ required: true })
  // cover_image: string;
  @Prop({ required: true })
  duration: number;
  @Prop({ required: true })
  data_url: string;
  @Prop({})
  created_at: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'genres',
  })
  genre: Genre[];
}

export const SongSchema = SchemaFactory.createForClass(Song);
