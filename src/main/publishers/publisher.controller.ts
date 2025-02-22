import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { Response } from '@utilities/helper-type.util';

@Controller()
export class PublisherController {
  constructor(private readonly service: PublisherService) {}

  @Get(':name')
  async findOne(@Res() res: Response, @Param('name') name: string) {
    return this.service
      .viewDetailPublisher(name)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: 'OK', data: result }),
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message }),
      );
  }
}
