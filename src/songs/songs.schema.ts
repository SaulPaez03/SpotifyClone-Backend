import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Album } from 'src/albums/album.schema';
import { Genre } from 'src/genres/genres.schema';
import { User } from 'src/users/users.schema';

@Schema()
export class Song {
  @Prop({
    required: true,
  })
  title: string;
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
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    refs: 'Album',
  })
  album: Album;
  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  artists: User[];
}

export const SongSchema = SchemaFactory.createForClass(Song);
