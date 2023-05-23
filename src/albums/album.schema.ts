import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Song } from 'src/songs/songs.schema';
import { User } from 'src/users/users.schema';
export type AlbumDocument = mongoose.HydratedDocument<Album>;
@Schema()
export class Album {
  @Prop({ required: true })
  title: string;
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'Song',
      },
    ],
  })
  songs: Song[];
  @Prop()
  isReleased: boolean;
  @Prop()
  releaseDate: string;
  @Prop({ required: true })
  cover_image: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  artists: User[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
