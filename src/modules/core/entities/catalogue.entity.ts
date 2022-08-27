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
  AssetEntity,
  CatalogueTypeEntity,
  MaterialEntity,
} from '@core/entities';

@Entity(TableNames.CATALOGUES, { schema: 'core' })
export class CatalogueEntity {
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

  @OneToMany(() => AssetEntity, (asset) => asset.type)
  @JoinColumn({ name: 'asset_type_id' })
  assetType: AssetEntity[];

  @OneToMany(() => MaterialEntity, (material) => material.type)
  @JoinColumn({ name: 'material_type_id' })
  materialType: MaterialEntity[];

  @ManyToOne(
    () => CatalogueTypeEntity,
    (catalogueType) => catalogueType.catalogueType,
  )
  @JoinColumn({ name: 'type_id' })
  type: CatalogueTypeEntity;

  @Column('varchar', {
    name: 'name',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  name: string;
}
