import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDTO } from './createAlbum.dto';
import { getMulterFileDataURI } from 'lib/files';
import { v2 as cloudinary } from 'cloudinary';
import { CustomError } from 'lib/customError';
import { ReqUser } from 'src/auth/auth.interface';

@Injectable()
export class AlbumService {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  async createNewAlbum(albumData: CreateAlbumDTO, user: ReqUser) {
    const messages = [];
    if (!albumData.title) messages.push('Title is required');
    if (!albumData.cover_image) messages.push('cover_image is required');

    console.log(messages);
    if (messages.length)
      throw new BadRequestException(
        CustomError(messages, HttpStatus.BAD_REQUEST),
      );
    const path = getMulterFileDataURI(albumData.cover_image);

    const extraArtists = albumData.artists?.split(',') ?? [];
    const uploadedImage = await cloudinary.uploader
      .upload(path, {
        folder: 'spotifyCovers',
        resource_type: 'image',
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          'Something went wrong',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      });
    if (uploadedImage.error) {
      throw new HttpException(
        'Errorr uploading image',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return this.albumModel.create({
      isReleased: false,
      title: albumData.title,
      cover_image: uploadedImage.secure_url,
      artists: [user.sub, ...extraArtists],
    });
  }

  async getAllAlbums() {
    return await this.albumModel.find().populate('artists');
  }
}
