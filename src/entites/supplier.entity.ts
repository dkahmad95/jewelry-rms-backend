import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupplierEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  phoneNumber: string;

  @Column({ default: 0 })
  cashBalance: number;

  @Column({ default: 0 })
  ramliBalance: number;
}
