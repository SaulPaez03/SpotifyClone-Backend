import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './playlist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Playlist.name,
        schema: PlaylistSchema,
      },
    ]),
  ],
  controllers: [],
  exports: [],
  providers: [],
})
export class PlaylistModule {}
