import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoOptions } from './config/database/mongo-options.constants';
import routesConfig, { destructModuleFromRoutes } from './config/routers/routes.config';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(mongoOptions),
    ...destructModuleFromRoutes(routesConfig),
    RouterModule.register(routesConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
