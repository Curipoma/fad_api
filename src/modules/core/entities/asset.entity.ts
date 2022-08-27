import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TableNames } from '@auth/enums';
import {
  AssetDetailEntity,
  CatalogueEntity,
  ConsumableEntity,
} from '@core/entities';

@Entity(TableNames.ASSETS, { schema: 'core' })
export class AssetEntity {
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

  @OneToMany(() => AssetDetailEntity, (assetDetails) => assetDetails.asset)
  @JoinColumn({ name: 'asset_details_id' })
  assetDetails: AssetDetailEntity[];

  @OneToMany(() => ConsumableEntity, (consumable) => consumable.asset)
  @JoinColumn({ name: 'asset_details_id' })
  consumables: ConsumableEntity[];

  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.assetType)
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  @Column('varchar', {
    name: 'code',
    length: 255,
    comment: 'código que identifica al activo',
  })
  code: string;

  @Column('varchar', {
    name: 'monetary_value',
    length: 255,
    comment: 'monto de valoración monetario',
  })
  monetaryValue: string;
}
