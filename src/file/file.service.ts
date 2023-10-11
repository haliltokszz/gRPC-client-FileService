/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Observable, ReplaySubject } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { FileServiceClient, FILE_SERVICE_NAME, FileInfo, BytesContent, FilePath } from '../file';
import { writeFile } from 'fs';

@Injectable()
export class FileService {
  private fileService;
  constructor(
    @Inject("FILE_PACKAGE")
    private grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.fileService = this.grpcClient.getService<FileServiceClient>(FILE_SERVICE_NAME);
  }

  async fileDownLoad(info: FileInfo): Promise<void> {
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

  async fileUpLoad(file: Express.Multer.File): Promise<void> {
    const subject = new ReplaySubject<BytesContent>();
    const chunkSize = 2048;  // Chunk size set to 2 KB
    const totalChunks = Math.ceil(file.size / chunkSize);
    const fileStream = file.buffer;

    const upload = this.fileService.fileUpLoad(subject).subscribe();

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = fileStream.subarray(start, end);

      const content: BytesContent = {
        buffer: chunk,
        fileSize: file.size,
        info: {
          fileName: file.originalname.split('.').shift()!,
          fileExtension: "." + file.originalname.split('.').pop()!,
        },
        readedByte: chunk.length,
      };

      // ReplaySubject is used to send each chunk to the server
      subject.next(content);
    }

    // Complete the stream once all chunks have been sent
    subject.complete();

    // Optionally, handle the response or errors from the server
    upload.unsubscribe();
  }


  getFilePath(info: FileInfo): FilePath {
    return this.fileService.getFilePath(info);
  }
}
