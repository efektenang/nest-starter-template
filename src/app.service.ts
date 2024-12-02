import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Enjoy your coffee😎. <br> >>> <a href="/api-docs">Here is an API Documentations.</a>';
  }
}
