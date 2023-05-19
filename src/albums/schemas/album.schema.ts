import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Song } from 'src/songs/schemas/songs.schema';
export type AlbumDocument = mongoose.HydratedDocument<Album>;
@Schema()
export class Album {
  @Prop({ required: true })
  title: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    refs: 'songs',
  })
  songs: Song[];
  @Prop()
  isReleased: boolean;
  @Prop()
  releaseDate: string;
  @Prop({ required: true })
  cover_image: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
