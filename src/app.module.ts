import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileControllerModule } from './file/file.module';

@Module({
  imports: [FileControllerModule],
  controllers: [AppController],
})
export class AppModule {}
