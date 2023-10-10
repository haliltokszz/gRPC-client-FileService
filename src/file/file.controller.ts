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
import { writeFile } from 'fs';
import { Observable } from 'rxjs';
import { BytesContent, FilePath } from 'src/file';
import { Request } from 'express';

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

    const fileStream: Observable<BytesContent> =
      this.fileService.fileDownLoad(info);

    // create file from stream
    const fileData: BytesContent = {
      buffer: Buffer.alloc(0),
      fileSize: 0,
      info: {
        fileName: '',
        fileExtension: '',
      },
      readedByte: 0,
    };

    // write file when stream is completed
    await new Promise((resolve) => {
      fileStream.subscribe({
        next: (resFile: BytesContent) => {
          fileData.buffer = Buffer.concat([fileData.buffer, resFile.buffer]);
          fileData.fileSize = resFile.fileSize;
          fileData.info = resFile.info;
          fileData.readedByte = resFile.readedByte;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          writeFile(
            `${fileData.info!.fileName}${fileData.info!.fileExtension}`,
            fileData.buffer,
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(
                `${fileData.info!.fileName}${
                  fileData.info!.fileExtension
                } was saved successfully.`,
              );
            },
          );
        },
      });
      resolve(fileData);
    });
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
