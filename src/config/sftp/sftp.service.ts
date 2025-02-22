import { Injectable } from '@nestjs/common';
import * as SftpClient from 'ssh2-sftp-client';
import { MediaSchema } from './schemas/media.schema';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SftpService {
  constructor(
    @InjectModel(MediaSchema)
    private readonly media: typeof MediaSchema,
  ) {}

  private sftp = new SftpClient();

  async uploadFile(
    file: Express.Multer.File,
    folderName: string,
    dataId: number | string,
    modelName: string,
  ): Promise<any> {
    const remoteFilePath = `${process.env.SFTP_ROOT}/${process.env.SFTP_FOLDER}/storage/${folderName}/${file?.filename}`;

    try {
      // Connect to SFTP
      await this.sftp.connect({
        host: process.env.SFTP_HOST,
        port: parseInt(process.env.SFTP_PORT, 10),
        username: process.env.SFTP_USERNAME,
        password: process.env.SFTP_PASSWORD,
      });

      const remoteFolder = `${process.env.SFTP_ROOT}/${process.env.SFTP_FOLDER}/storage/${folderName}`;

      // Checking remote folder has already exists in server.
      const folderExists = await this.sftp.exists(remoteFolder);
      if (!folderExists) {
        await this.sftp.mkdir(remoteFolder, true);
      }

      await this.sftp.put(file.path, remoteFilePath);

      // Save data to database
      const mediaSave = await this.media.create({
        model_type: modelName,
        model_id: dataId,
        size: file?.size,
        mimes_type: file?.mimetype,
        asset_url:
          process.env.DISK === 'sftp'
            ? `storage/${folderName}/${file?.filename}`
            : file.path,
        original_file_name: file?.originalname,
        file_name: file?.filename,
        disk: process.env.DISK ?? null,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return mediaSave;
    } catch (error) {
      throw error;
    } finally {
      await this.sftp.end();
    }
  }
}
