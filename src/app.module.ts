import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreModule } from './genres/genres.module';
import { SongsMOdule } from './songs/songs.module';
import { AlbumModule } from './albums/album.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://saulpaez03:100402@saulpaez03.keavy.mongodb.net/Spotify',
    ),
    GenreModule,
    SongsMOdule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
