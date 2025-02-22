import { Module } from '@nestjs/common';
import { PublisherController } from './publisher.controller';
import { PublisherSchemaRepository } from 'src/common/repositories/publisher.repository';
import { PublisherService } from './publisher.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PublisherSchema } from '../../common/models/publisher.schema';

@Module({
  imports: [SequelizeModule.forFeature([PublisherSchema])],
  controllers: [PublisherController],
  exports: [PublisherSchemaRepository],
  providers: [PublisherService, PublisherSchemaRepository],
})
export class PublisherModule {}
