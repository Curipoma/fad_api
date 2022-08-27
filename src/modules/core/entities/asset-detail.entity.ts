import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TableNames } from '@auth/enums';
import { AssetEntity, CatalogueEntity } from "@core/entities";

@Entity(TableNames.ASSET_DETAILS, { schema: 'core' })
export class AssetDetailEntity {
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

  @ManyToOne(() => AssetEntity, (asset) => asset.assetDetails)
  @JoinColumn({ name: 'asset_id' })
  asset: AssetEntity;

  @Column('varchar', {
    name: 'annual_existence',
    length: 255,
    comment: 'annual_existence',
  })
  annualExistence: string;

  @Column('varchar', { name: 'code', length: 255, comment: 'code' })
  code: string;

  @Column('varchar', {
    name: 'initial_existence',
    length: 255,
    comment: 'initial_existence',
  })
  initialExistence: string;

  @Column('varchar', { name: 'unit_value', length: 255, comment: 'unit_value' })
  unitValue: string;

  @Column('varchar', { name: 'value', length: 255, comment: 'value' })
  value: string;
}
