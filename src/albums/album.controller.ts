import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDTO } from './dto/createAlbum.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private AlbumService: AlbumService) {}
  @Post('new')
  @UseInterceptors(FileInterceptor('cover_image'))
  createNewAlbum(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateAlbumDTO,
  ) {
    if (!file || !body.title)
      throw new HttpException(
        'Title and cover_image are required',
        HttpStatus.BAD_REQUEST,
      );
    return this.AlbumService.createNewAlbum({
      ...body,
      cover_image: file,
    });
  }
}
