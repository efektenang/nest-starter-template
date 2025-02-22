import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  schema: 'public',
  tableName: 'publishers',
  timestamps: false,
  freezeTableName: true,
})
export class PublisherSchema extends Model {
  @AllowNull(false)
  @Column(DataType.STRING(50))
  name: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  is_writer: boolean;

  @AllowNull(false)
  @Column(DataType.DATE)
  created_at: Date;

  @AllowNull(true)
  @Column(DataType.DATE)
  updated_at?: Date;
}
