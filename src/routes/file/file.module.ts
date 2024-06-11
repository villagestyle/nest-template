import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';

@Module({
  imports: [MulterModule.register({})],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}
