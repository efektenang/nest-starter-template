import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly maxSize: number,
    private readonly allowedMimeTypes: string[],
  ) {}

  transform(file: Express.Multer.File): any {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types are: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `File size exceeds the limit of ${this.maxSize / (1024 * 1024)} MB`,
      );
    }

    return file;
  }
}
