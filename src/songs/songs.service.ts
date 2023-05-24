import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './songs.schema';
import { Model } from 'mongoose';
import { createSongDTO } from './songs.dto';
import { v2 as cloudinary } from 'cloudinary';
import { getMulterFileDataURI } from 'lib/files';
import { Genre } from 'src/genres/genres.schema';
import { CustomError } from 'lib/customError';
import { ReqUser } from 'src/auth/auth.interface';
import * as mongoose from 'mongoose';
import { Album } from 'src/albums/album.schema';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>,
    @InjectModel(Album.name) private albumModel: Model<Album>,
  ) {}

  async createNewSong(song: createSongDTO, user: ReqUser) {
    let errorMessages = [];
    const requiredFields = ['album', 'title', 'data', 'genres'];

    requiredFields.forEach((key) => {
      if (song[key] === undefined || '')
        errorMessages.push(`${key} is required`);
    });

    if (errorMessages.length)
      throw new HttpException(
        CustomError(errorMessages, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );

    if (!mongoose.isValidObjectId(song.album))
      throw new BadRequestException(CustomError(['Invalid album'], 401));
    const albumDocument = await this.albumModel.findById(song.album);
    if (!albumDocument)
      throw new BadRequestException(CustomError(['Album not found'], 401));
    const genresIds = song.genres.split(',') ?? [];
    const allArtists = [user.sub].concat(song.artists?.split(',') ?? []);

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
    const newSong = await this.songModel.create({
      created_at: new Date().toString(),
      data_url: uploadedSong.secure_url,
      duration: uploadedSong.duration,
      genre: genresIds,
      title: song.title,
      album: song.album,
      artists: allArtists,
    });
    albumDocument.songs.push(newSong.id);
    await albumDocument.save();

    return newSong;
  }
}
