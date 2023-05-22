import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreModule } from './genres/genres.module';
import { SongsMOdule } from './songs/songs.module';
import { AlbumModule } from './albums/album.module';
import { ProfileModule } from './profile/proofile.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

require('dotenv').config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URL),
    GenreModule,
    SongsMOdule,
    AlbumModule,
    ProfileModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
