import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoOptions } from './config/database/mongo-options.constants';
import { destructModuleFromRoutes } from './config/routers/routes.config';
import { RouterModule } from '@nestjs/core';
import ResponseMiddleware from './middlewares/response.mware';
import { SequelizeConnectModule } from './config/database/sequelize/database.module';
import appRouter from './routers/app.router';
import { SftpModule } from './config/sftp/sftp.module';

@Module({
  imports: [
    SftpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(mongoOptions),
    ...destructModuleFromRoutes(appRouter),
    RouterModule.register(appRouter),
    SequelizeConnectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseMiddleware).forRoutes('*');
  }
}
