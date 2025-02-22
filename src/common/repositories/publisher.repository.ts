import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { PublisherSchema } from 'src/common/models/publisher.schema';

@Injectable()
export class PublisherSchemaRepository extends BaseRepository<PublisherSchema> {
  constructor(
    private readonly sequelizeInstance: Sequelize,
    @InjectModel(PublisherSchema)
    private readonly publisherModel: typeof PublisherSchema,
  ) {
    super(sequelizeInstance, publisherModel);
  }

  async findByName(name: string): Promise<PublisherSchema | null> {
    return this.publisherModel.findOne({ where: { name } });
  }
}
