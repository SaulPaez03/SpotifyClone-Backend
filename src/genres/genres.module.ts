import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './schemas/genres.schema';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Genre.name,
        schema: GenreSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenreModule {}
