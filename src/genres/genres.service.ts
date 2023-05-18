import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from './schemas/genres.schema';
import { Model } from 'mongoose';
Injectable();
export class GenresService {
  constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) {}

  async createGenre(names: string[]) {
    if (!names.length) throw new Error('Name must be provided');
    return await this.genreModel.create(names.map((name) => ({ name })));
  }
}
