import { Injectable } from '@nestjs/common';
import { PublisherSchemaRepository } from 'src/common/repositories/publisher.repository';

@Injectable()
export class PublisherService {
  constructor(private readonly repository: PublisherSchemaRepository) {}

  async viewDetailPublisher(name: string): Promise<any> {
    try {
      return this.repository.findByName(name);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
