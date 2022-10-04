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
import { CatalogueEntity } from '@core/entities';
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

@Entity(TableNames.CATALOGUE_TYPES, { schema: 'core' })
export class CatalogueTypeEntity {
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

  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.type)
  @JoinColumn({ name: 'catalogue_type_id' })
  catalogueType: CatalogueEntity[];

  @Column('varchar', {
    name: 'name',
    length: 255,
    default: 'SN',
    comment: 'Nombre del tipo de catalogo',
  })
  name: string;

  @Column('varchar', {
    name: 'value',
    length: 255,
    default: 'SN',
    comment: 'Valor del tipo de catalogo',
  })
  value: string;
}
