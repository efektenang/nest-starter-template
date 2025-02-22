import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasOne,
} from 'sequelize-typescript';
import { MediaSchema } from 'src/config/sftp/schemas/media.schema';

@Table({
  schema: 'public',
  tableName: 'books',
  timestamps: false,
  freezeTableName: true,
})
export class BookSchema extends Model {
  @AllowNull(false)
  @Column(DataType.STRING(50))
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  publisher: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  created_at: Date;

  @AllowNull(true)
  @Column(DataType.DATE)
  updated_at?: Date;

  @HasOne(() => MediaSchema, {
    foreignKey: 'model_id',
    constraints: false,
  })
  media: MediaSchema;
}
