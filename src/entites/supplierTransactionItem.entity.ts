import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsPositive } from 'class-validator';

@Entity()
export class SupplierTransactionItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //TODO : DONT FORGET TO ADD THE ENUMERATIONS
  @Column()
  item: string;

  //todo : check how to add forein id
  @Column()
  supplierTransactionId: number;

  @Column()
  weight: number;

  @Column()
  description: string;

  @Column()
  @IsPositive()
  unitPrice: number;
}
