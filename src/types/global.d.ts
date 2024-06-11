import 'multer';

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        md5: string;
        suffix: string;
      }
    }
  }
}
