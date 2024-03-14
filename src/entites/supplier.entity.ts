import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Double } from 'typeorm';

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

  // @Column({ default: 0.0 })
  // cashBalance: Double;

  // @Column({ default: 0.0 })
  // ramliBalance: Double;
}
