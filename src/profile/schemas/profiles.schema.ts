import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Song } from 'src/songs/schemas/songs.schema';
export type ProfileDocument = mongoose.HydratedDocument<Profile>;
@Schema()
export class Profile {
  @Prop()
  full_name: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, refs: 'Song' }] })
  liked_songs: Song[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, refs: 'Playlist' }] })
  owned_playlists: any[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, refs: 'Playlist' }] })
  liked_playlists: any[];
}
export const ProfileSchema = SchemaFactory.createForClass(Profile);
