import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { CatalogueEntity } from '@core/entities';

@Entity('users', { schema: 'auth' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column('varchar', {
    name: 'email',
    length: 150,
    unique: true,
    comment: 'Correo Electronico',
  })
  email: string;

  @Column('timestamp', {
    name: 'email_verified_at',
    nullable: true,
    comment: 'Verificacion de correo',
  })
  emailVerifiedAt: Date;

  @Column('varchar', { name: 'lastname', length: 255, comment: 'Apellidos' })
  lastname: string;

  @Exclude()
  @Column('varchar', {
    name: 'password',
    length: 100,
    comment: 'Contraseña',
  })
  password: string;

  @Column('boolean', {
    name: 'password_changed',
    default: false,
    comment: 'true: ya cambió la contraseña y False:no',
  })
  passwordChanged: boolean;

  @Column('varchar', {
    name: 'personal_email',
    length: 150,
    nullable: true,
    comment: 'Correo Electronico Personal',
  })
  personalEmail: string;

  @Column('varchar', {
    name: 'phone',
    length: 20,
    nullable: true,
    comment: 'Teléfono',
  })
  phone: string;

  @Exclude()
  @Column('int', {
    name: 'max_attempts',
    default: 3,
    comment:
      'Intentos máximos para errar la contraseña, si llega a cero el usuario se bloquea',
  })
  maxAttempts: number;

  @Column('varchar', { name: 'name', length: 255, comment: 'Nombres' })
  name: string;

  @Column('timestamp', {
    name: 'suspended_at',
    nullable: true,
    comment: 'Fecha de la ultima suspension del usuario',
  })
  suspendedAt: Date;

  @Column('varchar', {
    name: 'username',
    length: 100,
    comment: 'Nombre de usuario para ingreso al sistema',
  })
  username: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await Bcrypt.hash(this.password, 10);
  }
}
