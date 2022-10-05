import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TableNames } from '@auth/enums';
import { MaterialEntity } from '@core/entities';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity(TableNames.AREAS, { schema: 'core' })
export class AreaEntity {
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

  @ManyToMany(() => MaterialEntity, (material) => material.areas)
  materials: MaterialEntity[];

  @Column('varchar', {
    name: 'name',
    length: 255,
    comment: 'nombre de una área',
  })
  readonly name: string;

  @Column('varchar', {
    name: 'unit_monetary_value',
    length: 255,
    comment: 'valor unitario del área',
  })
  readonly unitMonetaryValue: string;

  @Column('varchar', {
    name: 'code',
    length: 255,
    comment: 'código que identifica al área',
  })
  readonly code: string;
}
