import { Global, Module } from '@nestjs/common';
import { SftpService } from './sftp.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MediaSchema } from './schemas/media.schema';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([MediaSchema])],
  providers: [
    SftpService,
    {
      provide: 'SFTP-SERVICES',
      useClass: SftpService,
    },
  ],
  exports: [SftpService, 'SFTP-SERVICES'],
})
export class SftpModule {}
