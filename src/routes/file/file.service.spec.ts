import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';
import fs from 'fs';
import { FileController } from './file.controller';
import { PrismaService } from '../../prisma.service';

describe('FileService', () => {
  let fileService: FileService;
  let fileRepository: FileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService, FileRepository, PrismaService],
      controllers: [FileController]
    }).compile();

    fileService = module.get<FileService>(FileService);
    fileRepository = module.get<FileRepository>(FileRepository);
  });

  describe('saveFile', () => {

    beforeEach(() => {
      jest.spyOn(fileService, 'existFile').mockReturnValue(false);
      jest.spyOn(fileRepository, 'createFile').mockResolvedValue(undefined);
      jest.spyOn(fs, 'writeFileSync').mockReturnValue(undefined);
    })

    it('should save file and return md5 if file does not exist', async () => {
      // Arrange
      const file = {
        md5: 'file-md5',
        originalname: 'file-name',
        mimetype: 'file-type',
        size: 100,
        buffer: Buffer.from('file-content'),
      } as unknown as Express.Multer.File;

      // Act
      const result = await fileService.saveFile(file);

      // Assert
      expect(fileService.existFile).toHaveBeenCalledWith('file-md5');
      expect(fileRepository.createFile).toHaveBeenCalledWith({
        md5: 'file-md5',
        name: 'file-name',
        type: 'file-type',
        size: 100,
      });
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        './tmp/upload/file-md5',
        Buffer.from('file-content')
      );
      expect(result).toBe('file-md5');
    });

    it('should return md5 if file already exists', async () => {
      // Arrange
      const file = {
        md5: 'file-md5',
        originalname: 'file-name',
        mimetype: 'file-type',
        size: 100,
        buffer: Buffer.from('file-content'),
      } as unknown as Express.Multer.File;
      
      const existFileMock = jest.spyOn(fileService, 'existFile').mockReturnValue(true);
      const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});


      // Act
      const result = await fileService.saveFile(file);

      // Assert
      expect(existFileMock).toHaveBeenCalledWith('file-md5');
      expect(fileRepository.createFile).not.toHaveBeenCalled();
      expect(writeFileSyncMock).not.toHaveBeenCalled();
      expect(result).toBe('file-md5');

      existFileMock.mockRestore();
      writeFileSyncMock.mockRestore();
    });
  });

  describe('getFile', () => {

    beforeEach(() => {
      jest.spyOn(fileService, 'existFile').mockReturnValue(false);
      jest.spyOn(fileRepository, 'existFile').mockResolvedValue(undefined);

      jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from('file-content'));
    })

    it('should return null if file does not exist or file info is not found', async () => {
      // Arrange
      const md5 = 'file-md5';

      // Act
      const result = await fileService.getFile(md5);

      // Assert
      expect(fileService.existFile).toHaveBeenCalledWith('file-md5');
      expect(fileRepository.existFile).toHaveBeenCalledWith('file-md5');
      expect(fs.readFileSync).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return file info and buffer if file exists and file info is found', async () => {
      // Arrange
      const md5 = 'file-md5';

      jest.spyOn(fileService, 'existFile').mockReturnValue(true);
      jest.spyOn(fileRepository, 'existFile').mockResolvedValue({
        id: 1,
        create_time: new Date(),
        type: 'file-type',
        name: 'file-name',
        size: 100,
        md5: 'file-md5',
      });
      

      // Act
      const result = await fileService.getFile(md5);

      // Assert
      expect(fileService.existFile).toHaveBeenCalledWith('file-md5');
      expect(fileRepository.existFile).toHaveBeenCalledWith('file-md5');
      expect(fs.readFileSync).toHaveBeenCalledWith('./tmp/upload/file-md5');
      expect(result).toEqual({
        name: 'file-name',
        type: 'file-type',
        size: 100,
        buffer: Buffer.from('file-content'),
        id: 1,
        md5: 'file-md5',
        create_time: expect.any(Date),
      });
    });
  });

  describe('existFile', () => {

    beforeEach(() => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    })

    it('should return true if file exists', () => {
      // Arrange
      const md5 = 'file-md5';

      // Act
      const result = fileService.existFile(md5);

      // Assert
      expect(fs.existsSync).toHaveBeenCalledWith('./tmp/upload/file-md5');
      expect(result).toBe(true);
    });

    it('should return false if file does not exist', () => {
      // Arrange
      const md5 = 'file-md5';
      
      jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      // Act
      const result = fileService.existFile(md5);

      // Assert
      expect(fs.existsSync).toHaveBeenCalledWith('./tmp/upload/file-md5');
      expect(result).toBe(false);
    });
  });
});