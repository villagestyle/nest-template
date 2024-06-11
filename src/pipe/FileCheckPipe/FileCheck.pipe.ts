import { Injectable, PipeTransform } from '@nestjs/common';
import md5 from 'md5';

@Injectable()
export class FileCheckPipe implements PipeTransform {
  async transform(value: any) {
    const file: Express.Multer.File = value;

    const fileMd5 = md5(file.buffer);

    return {
      md5: fileMd5,
      suffix: file.originalname.split('.').pop(),
      ...file,
    };
  }
}
