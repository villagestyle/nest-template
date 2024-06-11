import { FileCheckPipe } from '@/pipe/FileCheckPipe/FileCheck.pipe';
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ResultConstructor } from '@/utils/ResultConstructor';
import { Response } from 'express';
import { AuthGuard } from '@/guard/AuthGuard/AuthGuard.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new FileCheckPipe())
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const md5 = await this.fileService.saveFile(file);

    ResultConstructor.Success(res, md5);
  }

  @Get('assets/:md5')
  async getAssets(@Param('md5') md5: string, @Res() res: Response) {
    const exist = await this.fileService.getFile(md5);

    if (!exist) {
      return ResultConstructor.RequestNotFound(res, '文件不存在');
    }

    res.send(exist.buffer);
  }
}
