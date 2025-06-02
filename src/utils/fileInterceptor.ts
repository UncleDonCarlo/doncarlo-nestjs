import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { extname } from 'path';

export function FileImageUploadInterceptor(fieldName: string) {
  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req: Request, file: Express.Multer.File, cb) => {
        const originalNameTrimmed = file.originalname.replace(/\s+/g, '');
        const fileExt = extname(originalNameTrimmed);
        const baseName = originalNameTrimmed.replace(fileExt, '');
        const filename = `${Date.now()}-${baseName}${fileExt}`;
        cb(null, filename);
      },
    }),
  });
}
