/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Observable, ReplaySubject } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { FileServiceClient, FILE_SERVICE_NAME, FileInfo, BytesContent, FilePath } from '../file';

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

  fileDownLoad(info: FileInfo): Observable<BytesContent> {
    return this.fileService.fileDownLoad(info);
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
