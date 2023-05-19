import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDTO } from './dto/createAlbum.dto';
import { getMulterFileDataURI } from 'lib/files';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class AlbumService {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  async createNewAlbum(albumData: CreateAlbumDTO) {
    const path = getMulterFileDataURI(albumData.cover_image);

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
    });
  }
}
