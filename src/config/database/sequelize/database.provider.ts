import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as Sequelize from 'sequelize';

// set auto parse numeric / float
((Sequelize.DataTypes as any)?.postgres as any).DECIMAL.parse = parseFloat;

export const DatabaseConnection = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async () => {
    return {
      dialect: 'postgres',
      uri: process.env['DATABASE_URL'],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    };
  },
});
