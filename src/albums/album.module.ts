import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schemas/album.schema';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Album.name,
        schema: AlbumSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
