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
import { ConsumableEntity, CatalogueEntity } from '@core/entities';

@Entity(TableNames.MATERIALS, { schema: 'core' })
export class MaterialEntity {
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

  @ManyToMany(() => ConsumableEntity, (consumables) => consumables.materials)
  @JoinTable()
  consumables: ConsumableEntity[];

  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.materialType)
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  @Column('varchar', { name: 'code', length: 255, comment: '' })
  code: string;

  @Column('varchar', { name: 'name', length: 255, comment: '' })
  name: string;

  @Column('timestamptz', { name: 'purchased_at', comment: '' })
  purchasedAt: Date;
}
