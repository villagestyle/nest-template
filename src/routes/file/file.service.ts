import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(private fileRepository: FileRepository) {}

  async saveFile(file: Express.Multer.File) {
    const exist = this.existFile(file.md5);

    if (exist) {
      return file.md5;
    }

    await this.fileRepository.createFile({
      md5: file.md5,
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    });
    fs.writeFileSync(`./tmp/upload/${file.md5}`, file.buffer);

    return file.md5;
  }

  async getFile(md5: string) {
    const fileExist = this.existFile(md5);

    const fileInfo = await this.fileRepository.existFile(md5);

    if (!fileExist || !fileInfo) {
      return null;
    }

    const buffer = fs.readFileSync(`./tmp/upload/${md5}`);

    return {
      ...fileInfo,
      buffer,
    };
  }

  existFile(md5: string) {
    const exist = fs.existsSync(`./tmp/upload/${md5}`);

    return exist;
  }
}
