import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

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
}
