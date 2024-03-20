import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

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

  @Column({ type: 'float', default: 0.0 })
  cashBalance: number = 0.0;

  @Column({ type: 'float', default: 0.0 })
  ramliBalance: number = 0.0;

  @Column({ type: 'float', default: 0.0 })
  silverBalance: number = 0.0;

  @CreateDateColumn({ type: 'date' })
  createdDate: Date;
}
