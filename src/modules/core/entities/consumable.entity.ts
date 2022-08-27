import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TableNames } from '@auth/enums';
import { AssetEntity, MaterialEntity } from '@core/entities';

@Entity(TableNames.CONSUMABLES, { schema: 'core' })
export class ConsumableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  @ManyToOne(() => AssetEntity, (asset) => asset.consumables)
  @JoinColumn({ name: 'asset_id' })
  asset: AssetEntity;

  @ManyToMany(() => MaterialEntity, (materials) => materials.consumables)
  @JoinTable()
  materials: MaterialEntity[];

  @Column('varchar', {
    name: 'amount',
    length: 255,
    comment: 'Cantidad de ese material',
  })
  amount: string;

  @Column('varchar', {
    name: 'code',
    length: 255,
    comment: 'código para identificar cada consumible',
  })
  code: string;

  @Column('varchar', {
    name: 'description',
    length: 255,
    comment: 'desripción del consumible',
  })
  description: string;

  @Column('varchar', {
    name: 'total_value',
    length: 255,
    comment: 'valor total = valor unitario por la cantidad',
  })
  totalValue: string;

  @Column('varchar', {
    name: 'unit_value',
    length: 255,
    comment: 'valor unitario de cada consumible',
  })
  unitValue: string;
}
