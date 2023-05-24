import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDTO } from './createAlbum.dto';
import { AlbumService } from './album.service';
import { User } from 'src/auth/auth.decorator';
import { ReqUser } from 'src/auth/auth.interface';

@Controller('album')
export class AlbumController {
  constructor(private AlbumService: AlbumService) {}
  @Post('new')
  @UseInterceptors(FileInterceptor('cover_image'))
  createNewAlbum(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateAlbumDTO,
    @User() user: ReqUser,
  ) {
    return this.AlbumService.createNewAlbum(
      {
        ...body,
        cover_image: file,
      },
      user,
    );
  }

  @Get('all')
  getAllAlbums() {
    return this.AlbumService.getAllAlbums();
  }
  @Put('plublish')
  publishAlbum(@Body() body) {}
}
