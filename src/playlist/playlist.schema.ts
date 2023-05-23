import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { type } from 'os';
import { Song } from 'src/songs/songs.schema';
import { User } from 'src/users/users.schema';
import { PlaylistSong } from './playlist.interface';

export type PlaylistDocument = mongoose.HydratedDocument<Playlist>;
@Schema()
export class Playlist {
  @Prop()
  name: string;
  @Prop({ type: [{ type: PlaylistSong }] })
  songs: PlaylistSong[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  collaborators: User[];
  @Prop()
  privacy_type: string;
  @Prop()
  creation_date: string;
}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
