import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './schemas/songs.schema';
import { Model } from 'mongoose';
import { createSongDTO } from './dto/songs.dto';
import { v2 as cloudinary } from 'cloudinary';
import { getMulterFileDataURI } from 'lib/files';
import { Genre } from 'src/genres/schemas/genres.schema';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>,
    @InjectModel(Genre.name) private genreModel: Model<Genre>,
  ) {}

  async createNewSong(song: createSongDTO) {
    if (!song)
      throw new HttpException('Song must not be empty', HttpStatus.BAD_REQUEST);

    const genresIds = song.genres.split(',');
    const songPath = getMulterFileDataURI(song.data);

    const uploadedSong = await cloudinary.uploader
      .upload(songPath, {
        folder: 'spotifySongs',
        resource_type: 'video',
        filename_override: song.title,
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (uploadedSong.error)
      throw new HttpException(
        'Could not uppload audio file',
        HttpStatus.SERVICE_UNAVAILABLE,
      );

    return this.songModel.create({
      created_at: new Date().toString(),
      data_url: uploadedSong.secure_url,
      duration: uploadedSong.duration,
      genre: genresIds,
      title: song.title,
    });
  }
}
