import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestSessionAsyncOptions, NestSessionOptions } from 'nestjs-session';

export const sessionConfig: NestSessionAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService): Promise<NestSessionOptions> => {
    return {
      session: {
        secret: config.get('SECRET_KEY'),
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: 'auto',
        },
      },
    };
  },
  inject: [ConfigService],
};
