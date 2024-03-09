import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupplierTransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //TODO , let it be a uuid
  @Column()
  supplierTransactionId:string

  //todo : check how to add forein id
  @Column()
  supplierId: number;

  @Column()
  total18kWeight: number;

  @Column()
  total18kPrice: number;
}
