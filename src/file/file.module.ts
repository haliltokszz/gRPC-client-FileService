import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FILE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:32775', //TODO: change to env. !DOCKERPORT
          package: 'file',
          protoPath: join(process.cwd(), 'src/file.proto'),
        },
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService, ClientsModule],
})
export class FileControllerModule {}
