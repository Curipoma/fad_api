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
import { CatalogueTypeEntity } from '@core/entities';
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

@Entity(TableNames.CATALOGUES, { schema: 'core' })
export class CatalogueEntity {
  @ApiModelProperty()
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
