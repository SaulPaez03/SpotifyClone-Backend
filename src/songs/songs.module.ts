import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './songs.schema';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { GenreModule } from 'src/genres/genres.module';
import { AlbumModule } from 'src/albums/album.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Song.name,
        schema: SongSchema,
      },
    ]),
    GenreModule,
    AlbumModule,
  ],
  exports: [MongooseModule],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsMOdule {}
