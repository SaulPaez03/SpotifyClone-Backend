import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './songs.schema';
import { Model } from 'mongoose';
import { createSongDTO } from './songs.dto';
import { v2 as cloudinary } from 'cloudinary';
import { getMulterFileDataURI } from 'lib/files';
import { Genre } from 'src/genres/genres.schema';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async createNewSong(song: createSongDTO) {
    let errorMessages = [];
    const requiredFields = ['album', 'title', 'data', 'genres'];
    requiredFields.forEach((key) => {
      console.log(song[key]);
      if (song[key] === undefined || '')
        errorMessages.push(`${key} is required`);
    });
    if (errorMessages.length)
      throw new HttpException(
        { error: true, errorMessages },
        HttpStatus.BAD_REQUEST,
      );
    const genresIds = song.genres.split(',');

    const songPath = getMulterFileDataURI(song.data);

    const uploadedSong = await cloudinary.uploader.upload(songPath, {
      folder: 'spotifySongs',
      resource_type: 'video',
    });

    if (uploadedSong.error)
      throw new HttpException(
        'Could not uppload audio file',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    return await this.songModel.create({
      created_at: new Date().toString(),
      data_url: uploadedSong.secure_url,
      duration: uploadedSong.duration,
      genre: genresIds,
      title: song.title,
      album: song.album,
    });
  }
}
