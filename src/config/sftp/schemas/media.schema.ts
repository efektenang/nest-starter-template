import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  schema: 'public',
  tableName: 'media',
  timestamps: false,
  freezeTableName: true,
})
export class MediaSchema extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  model_type: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  model_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  size: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  mimes_type: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  asset_url: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  original_file_name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  file_name: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  created_at: Date;

  @AllowNull(true)
  @Column(DataType.DATE)
  updated_at?: Date;
}
