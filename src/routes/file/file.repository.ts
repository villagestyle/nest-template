import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Files } from '@prisma/client';

@Injectable()
export class FileRepository {
  constructor(private prisma: PrismaService) {}

  async existFile(md5: string) {
    const exist = await this.prisma.files.findFirst({
      where: {
        md5,
      },
    });

    return exist;
  }

  async createFile(data: Omit<Files, 'id' | 'create_time'>) {
    return this.prisma.files.create({
      data: {
        ...data,
        create_time: new Date(),
      },
    });
  }

  async getFileList() {
    return this.prisma.files.findMany();
  }

  async getFileById(id: number) {
    return this.prisma.files.findUnique({
      where: {
        id,
      },
    });
  }

  async updateFile(id: number, data: Partial<Files>) {
    return this.prisma.files.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    });
  }

  async deleteFile(id: number) {
    return this.prisma.files.delete({
      where: {
        id,
      },
    });
  }
}
