import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TableNames } from '@auth/enums';
import { AreaEntity } from '@core/entities';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity(TableNames.MATERIALS, { schema: 'core' })
export class MaterialEntity {
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

  @ManyToMany(() => AreaEntity, (area) => area.materials)
  @JoinTable({
    name: 'materials_areas',
    joinColumn: {
      name: 'material_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'area_id',
      referencedColumnName: 'id',
    },
  })
  readonly areas: AreaEntity[];

  @Column('varchar', {
    name: 'description',
    comment: 'descripción del material',
  })
  readonly description: string;

  @Column('varchar', {
    name: 'initial_existence',
    comment: 'cantidad inicial del material',
  })
  readonly initialExistence: string;

  @Column('varchar', {
    name: 'annual_existence',
    comment: 'cantidad anual del material',
  })
  readonly annualExistence: string;

  @Column('varchar', {
    name: 'unit_value',
    comment: 'valor monetario unitario del material',
  })
  readonly unitValue: string;

  @Column('varchar', {
    name: 'total_value',
    comment: 'valor monetario total del material',
  })
  readonly totalValue: string;

  @Column('varchar', { name: 'code', comment: 'código del material' })
  readonly code: string;

  @Column('varchar', { name: 'amount', comment: 'cantidad de ese material' })
  readonly amount: string;

  @Column('varchar', {
    name: 'full_amount_value',
    comment: 'valor total del monto por cantidad',
  })
  readonly fullAmountValue: string;

  @Column('varchar', {
    name: 'unit_quantity_value',
    comment: 'valor total solo de valores unitarios',
  })
  readonly unitQuantityValue: string;
}
