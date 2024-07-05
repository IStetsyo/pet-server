import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async loadFiles(files: any[]) {
    try {
      const fileNames = files.map(async (file) => {
        const fileName = randomUUID() + '.jpg';
        const filePath = path.join(__dirname, '../static');
        if (!fs.existsSync(filePath)) {
          await fs.promises.mkdir(filePath, { recursive: true });
        }
        await fs.promises.writeFile(path.join(filePath, fileName), file.buffer);
        return fileName;
      });
      const names = await Promise.all(fileNames);
      return names;
    } catch (error) {
      throw new HttpException(
        'File writing error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
