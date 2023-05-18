import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateGenreDTO } from './dto/genre.dto';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}
  @Post('new')
  createGenres(@Body() body: CreateGenreDTO) {
    if (!body.names)
      throw new HttpException('names is required', HttpStatus.BAD_REQUEST);
    if (!Array.isArray(body.names))
      throw new HttpException('names must be an array', HttpStatus.BAD_REQUEST);
    return this.genresService.createGenre(body.names);
  }
}
