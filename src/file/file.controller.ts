import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { FilePath } from 'src/file';

@Controller('file-controller')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('download')
  async download(@Req() req: Request): Promise<void> {
    const { fileName, fileExtension } = req.query;
    const info = {
      fileName: fileName as string,
      fileExtension: fileExtension as string,
    };
    return this.fileService.fileDownLoad(info);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.fileService.fileUpLoad(file);
  }

  @Get('get-file-path')
  async getFilePath(@Req() req: Request): Promise<FilePath> {
    const { fileName, fileExtension } = req.query;

    const info = {
      fileName: fileName as string,
      fileExtension: fileExtension as string,
    };

    return this.fileService.getFilePath(info);
  }
}
