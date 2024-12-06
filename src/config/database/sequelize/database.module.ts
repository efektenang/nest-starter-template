import { Module } from '@nestjs/common';
import { DatabaseConnection } from './database.provider';

@Module({
  imports: [DatabaseConnection],
  exports: [DatabaseConnection],
})
export class SequelizeConnectModule {}
